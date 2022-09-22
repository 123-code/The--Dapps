import {React,useRef,useState,useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal';
import ethers, { Contract } from "ethers";
import { providers } from "ethers";

import {NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI} from "../constants";
 
export default function Home() {
  const Web3ModalRef = useRef();
  const [walletConnected,setwalletConnected] = useState(false);
  const [presaleStarted,setpresaleStarted] = useState(false);
  const [presaleended,setpresaleended] = useState(false);
  const [isowner,setisowner] = useState(false);

const getowner = async()=>{
  try{
    const signer= getProviderOrSigner();
    const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer);
    const owner = nftcontract.owner();
    const useraddress = signer.getAddress();

    if(owner.toLowerCase() === owner.toLowerCase()){
      setisowner(true)
    }

  
  }
  catch(err){
    console.error(err)
  }

}

  const startpresale = async()=>{
    try{
      const signer = await getProviderOrSigner(true);
      const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
      const txn = await nftcontract.startPresale();
      await txn.wait();
      setpresaleStarted(true); 
    }

catch(err){
  console.error(err);
}
  }

  const checkpresalestarted = async()=>{
    try{
      const provider = await getProviderOrSigner();
      const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
      const presalestarted = await nftcontract.presaleStarted();
      setpresaleStarted(presalestarted);
    }
    catch(err){
      console.error(err);
    }
  }

const checkpresaleneded = async()=>{
  try{

  }catch(err){
    console.error(err);
  }
}

  const connectwallet = async () => {
    try {

      await getProviderOrSigner();
      setwalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to rinkeby");
      throw new Error("Change network to rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

    useEffect(()=>{
      if(!walletConnected){
        Web3ModalRef.current = new Web3Modal({
          network:"rinkeby",
          providerOptions:{},
          disableInjectedProvider:false,
        });
        connectwallet();
        checkpresalestarted();
      }


    },[])

  


  return(
   <div>
    <Head>
      <title> CryptoDevs NFT</title>
    </Head>
<div className={styles.main}>
  
{!walletConnected ? (<button onClick={connectwallet} className={styles.button}> connect wallet </button>)
: null}
    

</div>
   </div>
    
  )
}

