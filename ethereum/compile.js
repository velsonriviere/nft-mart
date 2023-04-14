//////
////FIX LATER TAKE WHAT WORKS , bottom part is the latest way to compile, seems to work
//but doesnt write to file

var solc = require("solc");

var input = {
    language: "Solidity",
    sources: {
        "MyNFT.sol": {
            content:
                'import "lib.sol"; contract C { function f() public { L.f(); } }',
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

function findImports(path) {
    if (path === "lib.sol")
        return {
            contents:
                "library L { function f() internal returns (uint) { return 7; } }",
        };
    else return { error: "File not found" };
}

// New syntax (supported from 0.5.12, mandatory from 0.6.0)
var output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
);

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts["MyNFT.sol"]) {
    console.log(
        contractName +
            ": " +
            output.contracts["MyNFT.sol"][contractName].evm.bytecode.object
    );
}
