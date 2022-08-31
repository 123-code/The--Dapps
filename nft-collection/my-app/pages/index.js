import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRef,useState,useEffect} from 'react';
import Web3Modal from 'web3modal';
import { providers } from 'ethers';





export default function Home() {
  const [walletconnected,setwalletconnected] = useState(false);
  const web3modalref = useRef();


const checkpresalestarted = async ()=>{
  const provider = await getproviderorsigner();
  

}


  const connectwallet = async()=>{
    await getproviderorsigner();
    setwalletconnected(true);


  }


const getproviderorsigner = async(signer=false)=>{
    const provider = await web3modalref.current.connect();
const web3provider = new ethers.providers.Web3Provider(provider);

const {chainid} = await web3provider.getNetwork();

if(chainid !==4){
  window.alert("Not connected to rinkeby!");
  throw new Error("Incorrect network");
}

if(signer){
  const signer = web3provider.getSigner();
  return signer;
}
return web3provider;
  }


 
  useEffect(()=>{
    if(!walletconnected){
      web3modalref.current = new Web3Modal(
        {
          network:"rinkeby",
          providerOptions:{},
          disableInjectedProvider:false,
        }
      )

    }

  },[])
  return (
   <div>
    <Head>
      <title> NFT Minter </title>
    </Head>
  
      <div className={styles.main}>
      {!walletconnected ?   <button onClick = {connectwallet()} className = {styles.button}> Connect Wallet </button>
: null }

      </div>
   </div>
  )
}
