/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import Web3 from "web3";
import { useRouter } from "next/router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Storage from "../../firebaseConfig";
import compiledMyNFT from "../../../ethereum/build/MyNFT.json";
import { useNFTcreate } from "../../hooks/useNFTcreate";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNFTurlUpdate } from "../../hooks/useNFTurlUpdate";
import web3 from "../../../ethereum/web3";
import { FadeLoader } from "react-spinners";

const CreateNewArea = ({ className, space }) => {
    const router = useRouter();
    useEffect(() => {
        const protectPage = () => {
            //No user Logged in then redirect
            if (!localStorage?.getItem("user")) {
                router.push({
                    pathname: "/login",
                });
            }
        };
        protectPage();
    }, []);

    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("defaulturl.com");
    const [royalty, setRoyalty] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [onSale, setOnSale] = useState(false);
    const [itemPrice, setItemPrice] = useState(0);
    const { nftcreate, error } = useNFTcreate();
    const { urlupdate } = useNFTurlUpdate();
    const ADDRESS = "0x1a3e1e2dB673C96fF0FC2dcA79BA7FfD5AfFB13d";
    const myNFTcontract = new web3.eth.Contract(compiledMyNFT, ADDRESS);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const notify = () => toast("Your NFT is created");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log(
                "Non-ethereum browser detected. You should install Metamask"
            );
        }
        return provider;
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const { target } = e;
        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        const isPreviewBtn = submitBtn.dataset?.btn;
        setHasImageError(!selectedImage);
        if (isPreviewBtn && selectedImage) {
            setPreviewData({ ...data, image: selectedImage });
            setShowProductModal(true);
        }
        if (!isPreviewBtn) {
            //notify();
            //reset();
            setSelectedImage();
        }

        setIsProcessing(true);
        const currentProvider = detectCurrentProvider();
        await currentProvider.request({
            method: "eth_requestAccounts",
        });

        const weby3 = new Web3(currentProvider);
        const userAccount = await weby3.eth.getAccounts();
        const account = userAccount[0];

        // Mint nft through interacting with blockchain contract
        await myNFTcontract.methods
            .trueMint(royalty, itemPrice, onSale)
            .send({ from: account })
            .then(async (receipt) => {
                const tokenID = receipt.events.Transfer.returnValues.tokenId;
                console.log("Token ID is " + tokenID);
                console.log(myNFTcontract.options.address);
                console.log("Any errors: " + error);
                console.log("Now upload NFT prop values to DB");
                const user = JSON.parse(localStorage.getItem("user"));
                console.log(user);
                const userID = user.userID;
                const userName = user.name;
                //Upload NFT property values to database off that
                const mongoUpload = await nftcreate(
                    title,
                    description,
                    url,
                    royalty,
                    account,
                    itemPrice,
                    onSale,
                    tokenID,
                    userID,
                    userName
                );

                //Use nft id, created in MongoDB,to create a dynamic and unique image name
                // for image stored in firebase

                const storageRef = ref(
                    Storage,
                    `/nft/${mongoUpload.nftid}.jpg`
                );
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    selectedImage
                );
                // Listen for state changes, errors, and completion of the upload.
                //this.reset();
                setTitle("");
                setDescription("");
                setItemPrice("");
                setRoyalty("");
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Task progress, number of bytes uploaded and total number of bytes to be uploaded
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                        }
                    },
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case "storage/unauthorized":
                                // User doesn't have permission to access the object
                                break;
                            case "storage/canceled":
                                // User canceled the upload
                                break;

                            case "storage/unknown":
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                console.log("File available at", downloadURL);

                                //update image url after creating unique image url

                                await urlupdate(mongoUpload.nftid, downloadURL);
                            }
                        );
                    }
                );
                setIsProcessing(false);
                notify();
                reset();
            });
    };
    return (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                                <div className="upload-area">
                                    <div className="upload-formate mb--30">
                                        <h6 className="title">Upload file</h6>
                                        <p className="formate">
                                            Choose your file to upload
                                        </p>
                                    </div>

                                    <div className="brows-file-wrapper">
                                        <input
                                            name="file"
                                            id="file"
                                            type="file"
                                            className="inputfile"
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                            onChange={imageChange}
                                        />
                                        {selectedImage && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedImage
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}

                                        <label
                                            htmlFor="file"
                                            title="No File Choosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Choose a File
                                            </span>
                                            <p className="text-center mt--10">
                                                PNG, GIF, WEBP, MP4 or MP3.{" "}
                                                <br /> Max 1Gb.
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedImage && (
                                        <ErrorText>Image is required</ErrorText>
                                    )}
                                </div>

                                {/*<div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                                    <h5> Note: </h5>
                                    <span>
                                        {" "}
                                        Service fee : <strong>2.5%</strong>{" "}
                                    </span>{" "}
                                    <br />
                                    <span>
                                        {" "}
                                        You will receive :{" "}
                                        <strong>25.00 ETH $50,000</strong>
                                    </span>
                                </div> */}
                            </div>
                            <div className="col-lg-7">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    id="title"
                                                    placeholder="e. g. `Awesome Image NFT`"
                                                    {...register("name", {
                                                        required:
                                                            "Title or Name is required",
                                                    })}
                                                    onChange={(e) =>
                                                        setTitle(e.target.value)
                                                    }
                                                    value={title}
                                                />
                                                {errors.title && (
                                                    <ErrorText>
                                                        {errors.title?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Description"
                                                    className="form-label"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    rows="3"
                                                    placeholder="e. g. “Big beautiful NFT that represents...”"
                                                    {...register(
                                                        "description",
                                                        {
                                                            required:
                                                                "Description is required",
                                                        }
                                                    )}
                                                    onChange={(e) =>
                                                        setDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={description}
                                                />
                                                {errors.description && (
                                                    <ErrorText>
                                                        {
                                                            errors.description
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="price"
                                                    className="form-label"
                                                >
                                                    Item price in $
                                                </label>
                                                <input
                                                    id="itemPrice"
                                                    placeholder="minimum '1'"
                                                    {...register("price", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Please enter a number",
                                                        },
                                                        required:
                                                            "Price is required",
                                                        max: 100000,
                                                        min: 1,
                                                    })}
                                                    onChange={(e) =>
                                                        setItemPrice(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={itemPrice}
                                                />
                                                {errors.price && (
                                                    <ErrorText>
                                                        {errors.price?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Royalty"
                                                    className="form-label"
                                                >
                                                    Royalty %
                                                </label>
                                                <input
                                                    id="royalty"
                                                    placeholder="Maximum '95'"
                                                    {...register("royalty", {
                                                        required:
                                                            "Royalty percent is required",
                                                        max: 95,
                                                        min: 1,
                                                    })}
                                                    onChange={(e) =>
                                                        setRoyalty(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={royalty}
                                                />
                                                {errors.royalty && (
                                                    <ErrorText>
                                                        {
                                                            errors.royalty
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20"></div>
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <div className="input-box pb--20 rn-check-box">
                                                <input
                                                    className="rn-check-box-input"
                                                    type="checkbox"
                                                    id="putonsale"
                                                    onChange={(e) =>
                                                        setOnSale(
                                                            e.target.checked
                                                        )
                                                    }
                                                    checked={onSale}
                                                />
                                                <label
                                                    className="rn-check-box-label"
                                                    htmlFor="putonsale"
                                                >
                                                    Put on Sale
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <div className="input-box pb--20 rn-check-box">
                                                <span></span>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <div className="input-box pb--20 rn-check-box">
                                                <span></span>
                                            </div>
                                        </div>

                                        {false && (
                                            <div className="col-md-12 col-xl-4">
                                                <div className="input-box">
                                                    <Button
                                                        color="primary-alta"
                                                        fullwidth
                                                        type="submit"
                                                        data-btn="preview"
                                                        onClick={handleSubmit(
                                                            onSubmit
                                                        )}
                                                    >
                                                        Preview
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                                            <div className="input-box">
                                                {selectedImage &&
                                                    !isProcessing && (
                                                        <Button
                                                            onClick={handleSubmit(
                                                                onSubmit
                                                            )}
                                                            type="submit"
                                                            fullwidth
                                                        >
                                                            Create NFT
                                                        </Button>
                                                    )}
                                                {isProcessing && (
                                                    <FadeLoader
                                                        color="#3657d6"
                                                        loading={true}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                                <h5> Note: </h5>
                                <span>
                                    {" "}
                                    Service fee : <strong>2.5%</strong>{" "}
                                </span>{" "}
                                <br />
                                <span>
                                    {" "}
                                    You will receive :{" "}
                                    <strong>25.00 ETH $50,000</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showProductModal && (
                <ProductModal
                    show={showProductModal}
                    handleModal={handleProductModal}
                    data={previewData}
                />
            )}
        </>
    );
};

CreateNewArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewArea.defaultProps = {
    space: 1,
};

export default CreateNewArea;
