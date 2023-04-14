import { useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import { useRouter } from "next/router";
import { useLogout } from "src/hooks/useLogout";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Logout = () => {
    const router = useRouter();
    const { logout } = useLogout();
    useEffect(() => {
        logout();
        router.push({
            pathname: "/",
        });
    }, []);
};

export default Logout;
