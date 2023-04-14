import PropTypes from "prop-types";
import Image from "next/image";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import { ImageType } from "@utils/types";
import Anchor from "@ui/anchor";

const GalleryTab = ({ image }) => (
    <div className="product-tab-wrapper">
        <TabContainer defaultActiveKey="nav-0">
            <div className="pd-tab-inner">
                <Nav className="rn-pd-nav rn-pd-rt-content nav-pills">
                    <Nav.Link key={image} as="button" eventKey={`nav-0`}>
                        {false && (
                            <span className="rn-pd-sm-thumbnail">
                                <img
                                    src={image}
                                    alt={image?.alt || "Product"}
                                    width={167}
                                    height={167}
                                />
                            </span>
                        )}
                    </Nav.Link>
                </Nav>
                <TabContent className="rn-pd-content">
                    <TabPane key={image} eventKey={`nav-0`}>
                        <div className="rn-pd-thumbnail">
                            <Anchor path={image}>
                                <img
                                    src={image}
                                    alt={image?.alt || "Product"}
                                    width={560}
                                    height={560}
                                    priority
                                />
                            </Anchor>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </TabContainer>
    </div>
);

GalleryTab.propTypes = {
    image: PropTypes.arrayOf(ImageType),
};
export default GalleryTab;
