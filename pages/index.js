import React,{ useState,useEffect,useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal';
import { Contract,providers } from 'ethers';
import { contract_address, abi } from "../../Constants";

 
export default function Home(){
  const [WalletConnected,setWalletConnected] = useState(false);
  const [numofWhitelisted,setNumOfWhitelisted] = useState(0);
  const[joinedwhitelist,setjoinedwhitelist] = useState(false);
  const [loading,setloading] = useState(false);
  const web3modalref = useRef();

  // providers read contract data, signers change contract data.
  const getProviderOrSigner = async (needSigner = false) => {
    
    const provider = await web3modalref.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

  
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


  const addAddressToWhitelist = async()=>{ 
    try{
const signer = await getProviderOrSigner(true);
const whitelistContract = new Contract(
  contract_address, 
  abi,
  signer
);
const tx = await whitelistContract.WhitelistAddress()
setloading(true);
await tx.wait();
setloading(false);
await getNumberOfWhitelisted();
setjoinedwhitelist(true);
    }catch(err){
      console.error(err);
    }
  }

  const checkIfAddressIsWhitelisted = async()=>{
try{
  // we need a signer, so we pass a true value here 

const signer = getProviderOrSigner(true);
const whitelistContract = new Contract(
  contract_address, 
  abi,
  signer
);
const address = await signer.getAddress();
const _joinedwhitelist = await whitelistContract.whitelisted(address);
setjoinedwhitelist(_joinedwhitelist);
}
catch(err){
  console.error(err);

}
  }

// we only read from blockchain, so we get a provider
// instead of a signer. 
const getNumberOfWhitelisted = async()=>{
try{
  const provider = getProviderOrSigner();
  const whitelistContract = new Contract(
    contract_address, 
  abi,
  provider
  );
const _numofWhitelisted = await whitelistContract.numAddressesWhitelisted();
setNumOfWhitelisted(_numofWhitelisted);

}catch(err){
  console.error(err);
}
  }


const renderbutton = ()=>{
  if(WalletConnected){
  if(joinedwhitelist){
    return(
      <div className={styles.description}>
        Thanks for joining the whitelist!!
      </div>
    );}
  else if(loading){
    return <button className={styles.button}> Loading ... </button>
  }
  
  else if(!joinedwhitelist){ 
    return(
      <button onClick={addAddressToWhitelist} className={styles.button}>
        Join The Whitelist
      </button>
    )
  }
}
  else{
    <button onClick={connectWallet} className={styles.button}>
        Connect your Wallet 
      </button>;
  
  }
};
  

const connectWallet = async () => {
  try {

    await getProviderOrSigner();
    setWalletConnected(true);

    checkIfAddressIsWhitelisted();
    getNumberOfWhitelisted();
  } catch (err) {
    console.error(err);
  }
};

//each time walletconnected changes, these will be ran.
useEffect(() => {
  // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  if (!WalletConnected) {
    // Assign the Web3Modal class to the reference object by setting it's `current` value
    // The `current` value is persisted throughout as long as this page is open
    web3modalref.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    connectWallet();
  }
}, [WalletConnected]);



  return(
    <>
    <div>
      <Head>
        <title> Whitelist Dapp </title>
        <meta name="description" content="Whitelist-Dapp"/>

      </Head>
      <div className={styles.main}>

        <h1 className={styles.title}> Welcome to cryptoDevs </h1>
        <div className={styles.description}>
{numofWhitelisted} have already joined the Whitelist!
        </div>
        {renderbutton()}
       <div>
        <img className={styles.image} src="./crypto-devs.svg"/>
      </div>
      </div>
      
      <footer className={styles.footer}>

<div> Made with love by Crypto Devs</div>
      </footer>
    </div>

  
    </>
  )

}