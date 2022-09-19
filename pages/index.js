import React,{ useState,useEffect,useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal';
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../../Constants";

export default function Home(){
  const [WalletConnected,setWalletConnected] = useState(false);
  const [numofWhitelisted,setNumOfWhitelisted] = useState(0);
  const web3modalref = useRef();

  // providers read contract data, signers change contract data.
  const getProviderOrSigner = async(needSigner=false)=>{
    try{
      const provider = await web3modalref.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const {chainid} = await web3Provider.getNetwork();

      if(chainid !== 4){
        window.alert("Not Connected To Rinkeby!!");
        throw new Error("Change Network to rinkeby!!!")
      }
      if(needSigner){
        const signer = web3Provider.getSigner();
        return signer;
      }
    return web3Provider;
    }catch(err){
      console.error(err);
    }

  }


const connectWallet = async()=>{
try{
await getProviderOrSigner();
setWalletConnected(true);
checkIfAddressIsWhitelisted();
getNumberOfWhitelisted();
}
catch(err){
  console.error(err);
}
  }




const checkIfAddressIsWhitelisted = async()=>{

}

const getNumberOfWhitelisted = async()=>{

}


//each time walletconnected changes, these will be ran.
  useEffect(()=>{
    if(!WalletConnected){
      web3modalref.current = new Web3Modal({
        network:"rinkeby",
        providerOptions:{},
        disabledInjectedProvider:false,
      });
      connectWallet();
    }

  },[WalletConnected]);



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