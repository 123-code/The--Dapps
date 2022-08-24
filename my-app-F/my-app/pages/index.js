import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal';
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";

export Default function Home () {
  const [walletconnected,setwalletconnected] = useState('false');
  const [joinedlist,setjionedlist] = useState('false');
  const [loading,setloading] = useState('false');
  const[numwhitelisted,setnumwhitelisted] = useState(0);

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask

    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  // add Address to the list.

  const addAddressToWhitelist = async()=>{
    try{
      const signer = getProviderOrSigner(true);

      // declare a const that will represent the contract.
      const WhitelistContract = new Contract(
        'Address',
        abi,
        provider


      );
      const _numberofwhitelisted = await WhitelistContract.numAddressesWhitelisted();
      setnumwhitelisted(_numberofwhitelisted);

    }
    catch{(err)=>{
      console.error(err);
    }
  }

  

  
}


const Checkinwhitelist = async ()=>{
try{
  const signer = await getProviderOrSigner(true);

  const whitelistContract = new Contract(
    WHITELIST_CONTRACT_ADDRESS,
    abi,
    signer
  );
  const address = await signer.getAddress();
  const _joinedwhitelist = whitelistContract.whitelistedaddress(address);
  setjionedlist(_joinedlist);

  
}
catch{(err)=>{
  console.error(err);
}}

}

return(
  <>
  </>
)

}