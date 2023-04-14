/* eslint-disable no-console */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Web3 from "web3";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-main.json";
import menuLog from "../../../data/general/menu-main-login.json";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Header = ({ className }) => {
    const { user } = useAuthContext();
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ethBalance, setEthBalance] = useState("");

    let useMenu = menuData;
    let username;
    let image = "/images/client/client-5.jpeg";
    if (user) {
        useMenu = menuLog;
        username = user.name;
        //Set default image for new users
        if (
            user.userID !== "641657a4c42cf61c7ceb4a6c" &&
            user.userID !== "64165834c42cf61c7ceb4a71" &&
            user.userID !== "641658cfc42cf61c7ceb4a76" &&
            user.userID !== "64165935c42cf61c7ceb4a7b"
        ) {
            image = "/images/client/client-5.jpeg";
        } else {
            image = "/images/client/client-" + user.userID + ".jpeg";
        }
    }
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

    const onConnect = async () => {
        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({
                    method: "eth_requestAccounts",
                });

                const web3 = new Web3(currentProvider);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                const getEthBalance = await web3.eth.getBalance(account);
                const weiNum = parseInt(getEthBalance, 10);
                const ethPrice = parseFloat(
                    weiNum / 1000000000000000000
                ).toFixed(4);
                setEthBalance(ethPrice);
                setIsAuthenticated(true);

                localStorage.setItem("isWalletConnected", true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onDisconnect = () => {
        setIsAuthenticated(false);
        localStorage.setItem("isWalletConnected", false);
    };

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem("isWalletConnected") === "true") {
                try {
                    await onConnect();
                    localStorage.setItem("isWalletConnected", true);
                } catch (ex) {
                    console.log(ex);
                }
            }
        };
        connectWalletOnPageLoad();
    }, []);

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={useMenu} name={username} />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            {/*<div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div>
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>*/}
                            {!isAuthenticated && (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={onConnect}
                                        >
                                            Wallet connect
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {isAuthenticated && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown
                                        onDisconnect={onDisconnect}
                                        ethBalance={ethBalance}
                                        name={username}
                                        image={image}
                                    />
                                </div>
                            )}

                            <div>
                                <div className="icon-box">
                                    <Anchor>
                                        <i className="feather-bell" />
                                        <span className="badge">3</span>
                                    </Anchor>
                                </div>
                            </div>

                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={useMenu}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
