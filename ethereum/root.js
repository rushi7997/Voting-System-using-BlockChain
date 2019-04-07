//this is for root contract 
import web3 from "./web3";
import root from "./build/root.json";
const instance = new web3.eth.Contract(
    JSON.parse(root.interface),
    '0xB2C4Ea7Ce28c09e0B3d1065ec8Ecb05577D2f375'
);
export default instance;