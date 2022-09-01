import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRef,useState,useEffect} from 'react';
import Web3Modal from 'web3modal';
import { Contract, providers } from 'ethers';
import {NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI} from "../constants";
// deployed 0x5FbDB2315678afecb367f032d93F642f64180aa3





export default function Home() {
  const [walletconnected,setwalletconnected] = useState(false);
  const [presalestarted,setpresalestarted] = useState(false);
  const [isowner,setisowner] = useState(false);
  const [presaleended,setpresaleended] = useState(false);
  const web3modalref = useRef();

// function gets us the owner of the contract.
const getcontractowner = async()=>{
  try{
  const signer = await getproviderorsigner(true);

  const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer);

  const owner = nftcontract.owner();
  if(owner.toLowerCase === signer ){
    console.info("same")
  }
  else{
    console.info("Error");
  }


  }
  catch{(err)=>{
console.error(err);
  }}
  
}


const startpresale = async ()=>{
  try{
    const signer = await getproviderorsigner(true);
    const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer);
    const tx = await nftcontract.startPresale();
    await tx.wait();


  }
  catch{(err)=>{
console.error(err);
  }}

}

const checkpresaleended = async()=>{
  try{
    const provider = await getproviderorsigner();
    const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
   
    
  const presaleendtime = await nftcontract.presaleEnded();
  //date in seconds.
  const now = Date.now()/1000;
const haspresaleended = presaleendtime.lt(Math.floor(now));
setpresaleended(false);


  }catch{(err)=>{
    console.error(err);
  }};
}


const checkpresalestarted = async ()=>{
  try{
    const provider = await getproviderorsigner();
    const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
    const presalestarted = await nftcontract.presaleStarted();
    setpresalestarted(presalestarted);



  }catch{(err)=>{
    console.error(err);
  }};
  
  

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
    checkpresalestarted();

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
