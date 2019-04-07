const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

var input = {
    'root.sol': fs.readFileSync(path.resolve(__dirname, "contracts", "root.sol"), 'utf8'),
    'ERC20.sol': fs.readFileSync(path.resolve(__dirname, "contracts", "ERC20.sol"), 'utf8'),
    'SafeMath.sol': fs.readFileSync(path.resolve(__dirname, "contracts", "SafeMath.sol"), 'utf8'),
    'IERC20.sol': fs.readFileSync(path.resolve(__dirname, "contracts", "IERC20.sol"), 'utf8'),
    'ERC20Detailed.sol': fs.readFileSync(path.resolve(__dirname, "contracts", "ERC20Detailed.sol"), 'utf8')
};
    
const compiledOutput = solc.compile({ sources: input }, 1).contracts;
// console.log(compiledOutput);

//--------------------------------------------------------------------------------------------
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

for (let contract in compiledOutput) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '').split('.sol')[1] + '.json'),
        compiledOutput[contract]
    )
}
console.log("Done Compiling");