//this is for root contract 
import web3 from "./web3";
import root from "./build/root.json";
const instance = new web3.eth.Contract(
    JSON.parse(root.interface),
    '0x19C176E51E03C1e2e4394A0a5dCc2fB7aAD35e7F'
);
export default instance;