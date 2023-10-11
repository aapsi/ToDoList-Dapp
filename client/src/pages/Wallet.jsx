import React from 'react'
import {Web3} from "web3";
import { useState, useEffect } from 'react'
import ABI from "./ABI.json"

const Wallet = () => {

  const connectWallet = async () => {
    try{
      if(window.ethereum){
        // metamask injects window.ethereum object in our browser
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })
        
        const contractAddress = "0x34bc0b6bde2bad3c21a0ec3a155ee17b000fa00a"
        const contract = new web3.eth.Contract(ABI, contractAddress);
        console.log(contract)

      }
      else{
        throw new Error
      }
    }
    catch(error){
      console.log(error)
    }

  }
  return (
    <div><button onClick= {connectWallet}>Connect Wallet</button></div>
  )
}

export default Wallet