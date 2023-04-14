import PropTypes from "prop-types";
import Anchor from "@ui/anchor";

const ProductBid = ({ price, tokenID, onSale, likeCount }) => {
    const ethPrice = parseFloat(price * 0.00068).toFixed(4);
    return (
        <div className="bid-react-area">
            {onSale && (
                <div className="last-bid">
                    ${price} {" ("} {ethPrice} ETH {") "}
                </div>
            )}
            {!onSale && (
                <div className="last-bid">
                    <i className="feather-x-circle" />
                    <span> NOT FOR SALE</span>
                </div>
            )}
            <div className="react-area">
                <Anchor path={`/nft/${tokenID}`}>
                    <span className="number">
                        DETAILS <i className="feather-arrow-right-circle"></i>
                    </span>
                </Anchor>
            </div>
        </div>
    );
};

ProductBid.propTypes = {
    price: PropTypes.number,
    tokenID: PropTypes.number,
    onSale: PropTypes.bool,
    likeCount: PropTypes.number,
};

export default ProductBid;
