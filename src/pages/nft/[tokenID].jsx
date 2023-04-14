import { useEffect } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import ProductArea from "@containers/product/layout-03";
import { shuffleArray } from "@utils/methods";

// demo data
import productData from "../../data/products.json";
import { useGetNFTs } from "../../hooks/useGetNFTs";
import { useRouter } from "next/router";

const ProductDetails = ({ product }) => {
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
    return (
        <Wrapper>
            <SEO pageTitle="NFT Details" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle={product.nft.title}
                    currentPage="NFT Details"
                />
                <ProductDetailsArea product={product.nft} />
            </main>
            <Footer />
        </Wrapper>
    );
};
export async function getStaticPaths() {
    const response = await fetch(`http://localhost:4000/api/nfts/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    const paths = json.nft.map((token) => ({
        params: { tokenID: token.tokenID.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    /// try getting individual one here
    const { tokenID } = params;
    const response = await fetch(`http://localhost:4000/api/nfts/${tokenID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    const product = json;
    //const { categories } = product;
    //const recentViewProducts = shuffleArray(productData).slice(0, 5);
    //const relatedProducts = productData
    //.filter((prod) => prod.categories?.some((r) => categories?.includes(r)))
    //.slice(0, 5);
    return {
        props: {
            className: "template-color-1",
            product,
        }, // will be passed to the page component as props
    };
}

ProductDetails.propTypes = {
    product: PropTypes.shape({}),
    //recentViewProducts: PropTypes.arrayOf(PropTypes.shape({})),
    //relatedProducts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ProductDetails;
