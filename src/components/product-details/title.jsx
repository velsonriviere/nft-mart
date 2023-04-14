import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ShareDropdown from "../share-dropdown";
import web3 from "../../../ethereum/web3";
import compiledMyNFT from "../../../ethereum/build/MyNFT.json";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Web3 from "web3";
import { useNFTupdate } from "../../hooks/useNFTupdate";
import { FadeLoader } from "react-spinners";

const ProductTitle = ({
    className,
    title,
    ownerPrivilege,
    tokenID,
    onSale,
    salesPrice,
    likeCount,
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const { update } = useNFTupdate();
    const ADDRESS = "0x1a3e1e2dB673C96fF0FC2dcA79BA7FfD5AfFB13d";
    const myNFTcontract = new web3.eth.Contract(compiledMyNFT, ADDRESS);
    console.log(tokenID);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

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

    const notify = () => toast("NFT purchase was successful!");

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setIsProcessing(true);
        setIsSpinning(true);
        const currentProvider = detectCurrentProvider();
        await currentProvider.request({
            method: "eth_requestAccounts",
        });

        const weby3 = new Web3(currentProvider);
        const userAccount = await weby3.eth.getAccounts();
        const account = userAccount[0];
        //DB values
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const userID = user.userID;
        const userName = user.name;
        const priceETH = salesPrice * 0.00068;
        const priceWEI = priceETH * 1000000000000000000;
        const salesPriceWEI = priceWEI.toString();
        console.log(salesPriceWEI);
        const owner = account;
        // Buy nft through interacting with blockchain contract

        await myNFTcontract.methods
            .buy(tokenID)
            .send({ from: account, value: salesPriceWEI })
            .then(async (receipt) => {
                // Update NFT in DB
                const updatedNFTdb = await update(
                    tokenID,
                    owner,
                    userID,
                    userName
                );
                console.log(updatedNFTdb.salesPrice);
                setIsSpinning(false);
                notify();
                reset();
            });
    };

    return (
        <div className={clsx("pd-title-area", className)}>
            <h4 className="title">{title}</h4>
            <div className="pd-react-area">
                {!ownerPrivilege && (
                    <form>
                        {!isProcessing && onSale && (
                            <div className="heart-count">
                                <i className="feather-dollar-sign" />
                                <button
                                    type="submit"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    <span>BUY NOW</span>
                                </button>
                            </div>
                        )}
                        {!onSale && (
                            <div className="heart-count">
                                <i className="feather-x-circle" />
                                <span>NOT FOR SALE</span>
                            </div>
                        )}
                        {isProcessing && isSpinning && (
                            <div className="heart-count">
                                <FadeLoader color="#3657d6" loading={true} />
                            </div>
                        )}
                    </form>
                )}
                {/*(<div className="count">
                <ShareDropdown />
            </div>) */}
            </div>
        </div>
    );
};

ProductTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    ownerPrivilege: PropTypes.bool,
    onSale: PropTypes.bool,
    tokenID: PropTypes.number,
    salesPrice: PropTypes.number,
    likeCount: PropTypes.number,
};

ProductTitle.defaultProps = {
    likeCount: 0,
};

export default ProductTitle;
