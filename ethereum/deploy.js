const HWP = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const root = require('./build/root.json');

const provider = new HWP('stumble feel film resource damage limit happy supreme video castle impact vacant',
    'https://rinkeby.infura.io/v3/1831a5773bb24f8f9852d4732723ce24');
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploy on Account (Contract Owner): ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(root.interface))
        .deploy({ data: '0x' + root.bytecode, arguments: ['ElectCoin', 'ELC', 1] })
        .send({ from: accounts[0], gas: '3000000' });
    console.log("Contract Address : ", result.options.address);
}

deploy();