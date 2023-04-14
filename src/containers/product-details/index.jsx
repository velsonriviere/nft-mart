import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import ProductCategory from "@components/product-details/category";
import ProductCollection from "@components/product-details/collection";
import BidTab from "@components/product-details/bid-tab";
import PlaceBet from "@components/product-details/place-bet";
import { ImageType } from "@utils/types";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import Web3 from "web3";
import web3 from "../../../ethereum/web3";
import compiledMyNFT from "../../../ethereum/build/MyNFT.json";
import { useNFTpriceUpdate } from "../../hooks/useNFTpriceUpdate";
import { FadeLoader } from "react-spinners";

// Demo Image

const ProductDetailsArea = ({ space, className, product }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [onSale, setOnSale] = useState(false);
    const [ownerPrivilege, setOwnerPrivilege] = useState(false);
    const [itemPrice, setItemPrice] = useState(product.itemPrice);
    const { priceupdate } = useNFTpriceUpdate();
    const ADDRESS = "0x1a3e1e2dB673C96fF0FC2dcA79BA7FfD5AfFB13d";
    const myNFTcontract = new web3.eth.Contract(compiledMyNFT, ADDRESS);
    const ethPrice = parseFloat(product.itemPrice * 0.00068).toFixed(4);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const notify = () => toast("Sales price updated!");

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
        setIsProcessing(true);
        const currentProvider = detectCurrentProvider();
        await currentProvider.request({
            method: "eth_requestAccounts",
        });

        const weby3 = new Web3(currentProvider);
        const userAccount = await weby3.eth.getAccounts();
        const account = userAccount[0];
        // Updating NFT sales price and putting it on sale
        await myNFTcontract.methods
            .allowBuy(product.tokenID, itemPrice)
            .send({ from: account })
            .then(async (receipt) => {
                const updatedPrice = await priceupdate(
                    product.tokenID,
                    itemPrice
                );
                console.log(updatedPrice.itemPrice);
                setItemPrice(updatedPrice.itemPrice);
                setIsProcessing(false);
                notify();
                reset();
            });
    };
    useEffect(() => {
        const checkPrivilege = async () => {
            if (localStorage?.getItem("user")) {
                try {
                    const user = JSON.parse(localStorage.getItem("user"));
                    console.log(user);
                    if (user.userID === product.userID) {
                        setOwnerPrivilege(true);
                    }
                } catch (ex) {
                    console.log(ex);
                }
            }
        };
        checkPrivilege();
    }, []);
    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <GalleryTab image={product.url} />
                        </Sticky>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitle
                                title={product.title}
                                ownerPrivilege={ownerPrivilege}
                                likeCount={product.likeCount}
                                onSale={product.onSale}
                                tokenID={product.tokenID}
                                salesPrice={product.salesPrice}
                            />
                            <span className="bid">
                                USD/ETH Price{" "}
                                <span className="price">
                                    ${itemPrice} {" ("} {ethPrice} ETH {") "}
                                </span>
                            </span>
                            <h6 className="title-name">
                                {product.description}
                            </h6>
                            <h6 className="title-name">
                                Owner : {product.userName}
                            </h6>
                            {/* <div className="catagory-collection">
                            <ProductCategory owner={product.owner} />
                            <ProductCollection
                                collection={product.collection}
                            />
                        </div> */}
                            {ownerPrivilege && (
                                <form>
                                    <div className="form-wrapper-one">
                                        <div className="col-md-12">
                                            <div className="input-box pb--10">
                                                <h6>
                                                    <i className="feather-user-check" />{" "}
                                                    Owner Privilege
                                                </h6>
                                                <label
                                                    htmlFor="Sales Price Update"
                                                    className="form-label"
                                                >
                                                    Price update puts NFT on
                                                    sale
                                                </label>
                                                <input
                                                    id="itemPrice"
                                                    placeholder={
                                                        product.itemPrice
                                                    }
                                                    {...register("price", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Please enter a number",
                                                        },
                                                        required:
                                                            "Price is required",
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
                                        {!isProcessing && (
                                            <Button
                                                onClick={handleSubmit(onSubmit)}
                                                type="submit"
                                                fullwidth
                                                color="primary-alta"
                                            >
                                                Set New Price
                                            </Button>
                                        )}
                                        {isProcessing && (
                                            <FadeLoader
                                                color="#3657d6"
                                                loading={true}
                                            />
                                        )}
                                    </div>
                                </form>
                            )}
                            <div className="rn-bid-details">
                                {/*
                            <BidTab
                                bids={product?.bids}
                                owner={product.owner}
                                properties={product?.properties}
                                tags={product?.tags}
                                history={product?.history}
                            />
                            <PlaceBet
                                highest_bid={product.highest_bid}
                                auction_date={product?.auction_date}
                            />
                            */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        tokenID: PropTypes.number,
        likeCount: PropTypes.number,
        onSale: PropTypes.bool,
        salesPrice: PropTypes.number,
        price: PropTypes.number,
        owner: PropTypes.shape({}),
        collection: PropTypes.shape({}),
        bids: PropTypes.arrayOf(PropTypes.shape({})),
        properties: PropTypes.arrayOf(PropTypes.shape({})),
        tags: PropTypes.arrayOf(PropTypes.shape({})),
        history: PropTypes.arrayOf(PropTypes.shape({})),
        highest_bid: PropTypes.shape({}),
        auction_date: PropTypes.string,
        images: PropTypes.arrayOf(ImageType),
    }),
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
