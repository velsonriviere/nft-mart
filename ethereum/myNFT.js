import web3 from "./web3";
import MyNFT from "./build/MyNFT.json";

const instance = new web3.eth.Contract(
    JSON.parse(MyNFT.interface),
    "0x793803D0B91fbcdC94a0209f0DD25b28f24885E1"
);

export default instance;
