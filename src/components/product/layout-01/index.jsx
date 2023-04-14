import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Product = ({
    overlay,
    ownerName,
    creatorName,
    ownerID,
    creatorID,
    tokenID,
    title,
    description,
    onSale,
    slug,
    latestBid,
    price,
    royalty,
    likeCount,
    auction_date,
    image,
    bitCount,
    authors,
    placeBid,
    disableShareDropdown,
}) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    let ownerIsCreator = false;
    if (ownerID === creatorID) {
        ownerIsCreator = true;
    }
    //default image for new users

    let creatorImg = false;
    if (
        creatorID !== "641657a4c42cf61c7ceb4a6c" &&
        creatorID !== "64165834c42cf61c7ceb4a71" &&
        creatorID !== "641658cfc42cf61c7ceb4a76" &&
        creatorID !== "64165935c42cf61c7ceb4a7b"
    ) {
        creatorImg = true;
    }

    let ownerImg = false;
    if (
        ownerID !== "641657a4c42cf61c7ceb4a6c" &&
        ownerID !== "64165834c42cf61c7ceb4a71" &&
        ownerID !== "641658cfc42cf61c7ceb4a76" &&
        ownerID !== "64165935c42cf61c7ceb4a7b"
    ) {
        ownerImg = true;
    }

    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid"
                )}
            >
                <div className="card-thumbnail">
                    {image && (
                        <Anchor path={`/nft/${tokenID}`}>
                            <img
                                src={image}
                                alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                    {auction_date && <CountdownTimer date={auction_date} />}
                    {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )}
                </div>
                <div className="product-share-wrapper">
                    {ownerIsCreator && (
                        <div className="profile-share">
                            <span style={{ marginRight: "15pt" }}>
                                {" "}
                                Owner/Creator ( {royalty}% royalty ){" "}
                            </span>
                            <ClientAvatar
                                slug="#"
                                name={ownerName}
                                image={
                                    ownerImg
                                        ? `/images/client/client-5.jpeg`
                                        : `/images/client/client-${ownerID}.jpeg`
                                }
                            />

                            <Anchor
                                className="more-author-text"
                                path={`/nft/${tokenID}`}
                            ></Anchor>
                        </div>
                    )}

                    {!ownerIsCreator && (
                        <div className="profile-share">
                            <span style={{ marginRight: "15pt" }}> Owner </span>
                            <ClientAvatar
                                slug="#"
                                name={ownerName}
                                image={
                                    ownerImg
                                        ? `/images/client/client-5.jpeg`
                                        : `/images/client/client-${ownerID}.jpeg`
                                }
                            />

                            <Anchor
                                className="more-author-text"
                                path={`/nft/${tokenID}`}
                            ></Anchor>
                            <span style={{ marginRight: "15pt" }}>
                                {" "}
                                Creator ({royalty} % royalty){" "}
                            </span>

                            <ClientAvatar
                                slug="#"
                                name={creatorName}
                                image={
                                    creatorImg
                                        ? `/images/client/client-5.jpeg`
                                        : `/images/client/client-${creatorID}.jpeg`
                                }
                            />

                            <Anchor
                                className="more-author-text"
                                path={`/nft/${tokenID}`}
                            ></Anchor>
                        </div>
                    )}
                    {disableShareDropdown && <ShareDropdown />}
                </div>
                <Anchor path={`/nft/${tokenID}`}>
                    <span className="product-name">{title}</span>
                </Anchor>
                <span className="latest-bid">{description}</span>
                <ProductBid
                    price={price}
                    tokenID={tokenID}
                    onSale={onSale}
                    likeCount={likeCount}
                />
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

Product.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    ownerName: PropTypes.string,
    creatorName: PropTypes.string,
    ownerID: PropTypes.number,
    creatorID: PropTypes.number,
    tokenID: PropTypes.number,
    description: PropTypes.string,
    onSale: PropTypes.bool,
    slug: PropTypes.string,
    latestBid: PropTypes.string,
    price: PropTypes.number,
    royalty: PropTypes.number,
    likeCount: PropTypes.number,
    auction_date: PropTypes.string,
    image: ImageType,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            slug: PropTypes.string,
            image: ImageType,
        })
    ),
    bitCount: PropTypes.number,
    placeBid: PropTypes.bool,
    disableShareDropdown: PropTypes.bool,
};

Product.defaultProps = {
    overlay: false,
};

export default Product;
