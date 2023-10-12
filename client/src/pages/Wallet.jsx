import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import ABI from "./ABI.json"
const Wallet =({saveState})=>{
    const navigateTo =useNavigate();
    const connectWallet =async()=>{
       try{
          if(window.ethereum){
              const web3 = new Web3(window.ethereum);
              const accounts = await window.ethereum.request({
                method:"eth_requestAccounts"
              })
              const contractAddress = "0x34bc0b6BdE2bad3C21A0Ec3a155ee17B000Fa00A";
              const contract = new web3.eth.Contract(ABI,contractAddress);
              saveState({web3:web3,contract:contract,account:accounts[0]})
              navigateTo("/view-all-tasks")
          }else{
            throw new Error
          }
       }catch(error){
          console.error(error)
       }
    }

    return(
      <>
        <div className="wallet_header ">
          <span>WELCOME TO</span> <p>To Do List 3.0</p>
        </div>
        <div className="connect_wallet_section todo_btn">
          <p> Please connect your metamask wallet </p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </>
    );
}

export default Wallet;

// const Wallet = ({saveState}) => {

//   // using this we can go to any particular component
//   const navigateTo = useNavigate()
//   const connectWallet = async () => {
//     try{
//       if(window.ethereum){
//         // metamask injects window.ethereum object in our browser
//         const web3 = new Web3(window.ethereum);
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts"
//         })
        
//         const contractAddress = "0x34bc0b6BdE2bad3C21A0Ec3a155ee17B000Fa00A"
//         const contract = new web3.eth.Contract(ABI,contractAddress);
//         // setting the values to saveState that was passed as props 
//         saveState({web3:web3,contract:contract,account:accounts[0]})
//         //  what we are doing here is navigating to view all tasks page as soon as the wallet is connected and we get our state        
//         navigateTo("/view-all-tasks")
//       }
//       else{
//         throw new Error();
//       }
//     }
//     catch(error){
//       console.log(error)
//     }

//   }

//   return(
//     <>
//       <div className="wallet_header ">
//         <span>WELCOME TO</span> <p>TODO 3.0</p>
//       </div>
//       <div className="connect_wallet_section todo_btn">
//         <p> Please connect metamask wallet to access the app </p>
//         <button onClick={connectWallet}>Connect Wallet</button>
//       </div>
//     </>
//   );
// }

// Wallet.propTypes = {
//   saveState: PropTypes.func.isRequired,
// };

// export default Wallet