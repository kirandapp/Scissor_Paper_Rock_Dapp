import Web3 from 'web3';
import sprContractBuild from './ABI/ScissorPaperRock.json';

let selectedAccount;
let sprContract = '0xc5D85ED6EFC84e823497521e778E30f79F16e6e8';
let isInitialized = false;
export const init = async () => {
    let provider = window.ethereum;
    if(typeof provider !== 'undefined') {
      provider
      .request({ method: 'eth_requestAccounts'})
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected Account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log("Error ",err);
        return;
      });
      window.ethereum.on('accountsChanged',function (acccounts) {
        selectedAccount = acccounts[0];
        console.log(`Selected Account changed to ${selectedAccount}`);
      });
    }

    const web3 = new Web3(provider);
    sprContract = new web3.eth.Contract(sprContractBuild.abi, sprContract);

    isInitialized = true;
};


