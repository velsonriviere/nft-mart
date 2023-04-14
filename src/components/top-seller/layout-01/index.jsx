import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { ImageType } from "@utils/types";

const TopSeller = ({
    name,
    member_since,
    total_sale,
    image,
    slug,
    className,
    isVarified,
    followBtn,
}) => {
    const createdAt = member_since; //"2020-03-30T12:44:20.221+00:00"
    const date = new Date(createdAt);
    const member_sinceFormatted = date.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
    });
    return (
        <div className={clsx("top-seller-inner-one", className)}>
            <div className="top-seller-wrapper">
                <div className={clsx("thumbnail", isVarified && "varified")}>
                    <Anchor path="#">
                        {image && (
                            <img
                                src={image}
                                alt={image?.alt || name}
                                width={image?.width || 54}
                                height={image?.height || 54}
                            />
                        )}
                    </Anchor>
                </div>
                {name && (
                    <div className="top-seller-content">
                        <Anchor path="#">
                            <h6 className="name">{name}</h6>
                        </Anchor>
                        <span className="count-number">
                            {/*new Intl.NumberFormat("en-US", {
                            currency: "USD",
                        }).format(total_sale)*/}
                            Member since:
                        </span>
                        <span> {member_sinceFormatted} </span>
                    </div>
                )}
            </div>
            {followBtn && (
                <Button path={slug} color="primary-alta" size="small">
                    Follow
                </Button>
            )}
        </div>
    );
};

TopSeller.propTypes = {
    name: PropTypes.string,
    member_since: PropTypes.string,
    total_sale: PropTypes.number,
    slug: PropTypes.string,
    image: ImageType,
    className: PropTypes.string,
    isVarified: PropTypes.bool,
    followBtn: PropTypes.bool,
};

export default TopSeller;
