import { useEffect, useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-04";
import CreatorArea from "@containers/creator/layout-01";
import LiveExploreArea from "@containers/live-explore/layout-02";
import ServiceArea from "@containers/services/layout-01";
import NewestItmesArea from "@containers/product/layout-04";
import ExploreProductArea from "@containers/explore-product/layout-01";
import CollectionArea from "@containers/collection/layout-01";
import { normalizedData } from "@utils/methods";
import { useGetNFTs } from "../hooks/useGetNFTs";
import { useGetUsers } from "../hooks/useGetUsers";
import { useAuthContext } from "../hooks/useAuthContext";

// Demo data
import homepageData from "../data/homepages/home-main.json";
import homepageDataLog from "../data/homepages/home-main-logged.json";
import sellerData from "../data/sellers.json";
import productData from "../data/products.json";
import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home02 = () => {
    const { user } = useAuthContext();
    const { getusers, users } = useGetUsers();
    const { getnfts, nfts } = useGetNFTs();
    let homeData = homepageData;
    if (user) {
        homeData = homepageDataLog;
    }
    useEffect(() => {
        getusers();
    }, []);
    useEffect(() => {
        getnfts();
    }, []);
    console.log(users);
    console.log("----------");
    console.log(nfts);

    const content = normalizedData(homeData?.content || []);
    const liveAuctionData = productData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);
    const newestData = productData
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);
    return (
        <Wrapper>
            <SEO pageTitle="NFT Home Page" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                <CreatorArea
                    data={{
                        ...content["top-sller-section"],
                        creators: users,
                    }}
                />
                {/*   <NewestItmesArea
                    data={{
                        ...content["newest-section"],
                        products: newestData,
                    }}
                />
                <LiveExploreArea
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                    gap={5}
                /> */}
                <ExploreProductArea
                    data={{
                        ...content["explore-product-section"],
                        products: nfts,
                    }}
                />
                <ServiceArea data={content["service-section"]} />
                {/*  <CollectionArea
                    data={{
                        ...content["collection-section"],
                        collections: collectionsData.slice(0, 4),
                    }}
                /> */}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home02;
