import React from 'react'
import {Web3} from "web3";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import ABI from "./ABI.json"

const Wallet = ({saveState}) => {

  // using this we can go to any particular component
  const navigateTo = useNavigate()
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
        // setting the values to saveState that was passed as props 
        saveState({web3:web3,contract:contract,account:accounts[0]})
        //  what we are doing here is navigating to view all tasks page as soon as the wallet is connected and we get our state        
        navigateTo("/view-all-tasks")
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