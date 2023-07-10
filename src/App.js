import './App.css';
import React, {useState, useEffect} from 'react';
import abi from './ABI/ScissorPaperRock.json';
import Play from './components/Play';
import {ethers} from 'ethers';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState("None");


  useEffect(()=>{
    const connectWallet = async() => {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; //0xc5D85ED6EFC84e823497521e778E30f79F16e6e8
      const contractABI = abi.abi;
        try {
          const {ethereum} = window;
          if(ethereum) {
            console.log(window.ethereum.networkVersion,"network id");
            const account = await ethereum.request({method: 'eth_requestAccounts'});
            if(window.ethereum.networkVersion == process.env.REACT_APP_CHAIN_ID) {
              window.ethereum.on("chainChanged",()=>{
                window.location.reload();
              });
              window.ethereum.on("accountsChanged",()=>{
                window.location.reload();
              });
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const contract = new ethers.Contract(contractAddress, contractABI, signer);
              setAccount(account);
              setState({provider, signer, contract});
            } else if (window.ethereum.networkVersion != process.env.NEXT_PUBLIC_CHAIN_ID) {
              alert("Please switch to Fantom Testnet")
            }
          } else {
            alert("Install Metamask First");
          }
        } catch(error) {
          console.log("ERROR ",error);
        }
    };
    const handleNetworkChange = () => {
      window.location.reload()
    }
    const handleAccountsChange = () => {
      window.location.reload()
    }
    connectWallet();
    window.ethereum.on("networkChanged", handleNetworkChange)
    window.ethereum.on("accountsChanged", handleAccountsChange)

    return () => {
      window.ethereum.removeListener("networkChanged", handleNetworkChange)
      window.ethereum.removeListener("accountsChanged", handleAccountsChange)
    }
  },[]);
  return (
    <div style={{background: "#EFEFEF", height: "90vh", background: "linear-gradient(to right, #d3cce3, #e9e4f0)"}}>
      <p>Connect Account - {account}</p>
      <div className = "App">
        <Play state={state} account={account}></Play>
      </div>
    </div>
  )
}

export default App;
