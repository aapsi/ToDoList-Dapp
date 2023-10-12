const ABI = require("../ABI.json");
const  {Web3} = require('web3');


// adding rpc
const web3 = new Web3("https://sepolia.infura.io/v3/0717d56f5a4542e5aa40e0bb1f4a39ca")

const contractAddress = "0x34bc0b6bde2bad3c21a0ec3a155ee17b000fa00a"

// CREATING INSTANCE OF CONTRACT
const contract = new web3.eth.Contract(ABI, contractAddress);

module.exports = {contract}