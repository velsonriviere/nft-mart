const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledMyNFT = require("./build/MyNFT.json");
//const compiledByteCode = require('./build/bytecode.json');

//Something wrong with this, use the other provider set up to deploy
const provider = new HDWalletProvider(
    "walnut spoil absurd border detect puzzle inquiry tattoo retire pottery hood tent",
    // remember to change this to your own phrase!
    "https://goerli.infura.io/v3/021ee5a2c1974b9899f7ea701afd649d"
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledMyNFT)

        .deploy({ data: compiledByteCode })
        .send({ gas: "10000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop(); // to prevent a hanging deployment
};
deploy();
