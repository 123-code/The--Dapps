import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRef,useState,useEffect} from 'react';
import Web3Modal from 'web3modal';
import { Contract, providers, utils } from "ethers";
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

  const isowner = await nftcontract.owner();
  if(isowner.toLowerCase() === signer ){
    setisowner(true);
    console.info("same")
  }
  
  }
  catch{(err)=>{
console.error(err);
  }}
  
}

const presalemint = async()=>{

try{
  const signer = await getproviderorsigner(true);
  const nftcontract = new Contract(
    NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer
  )
const txn = await nftcontract.presaleMint({
  value:utils.parseEther(0.01),
})

await txn.wait();

}
catch{
  (err)=>{
    console.error(err);
  }
}

  
  
}


const publicsalemint = async ()=>{
  try{
    const signer = await getproviderorsigner(true);
    const nftcontract = new Contract(
      NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer
    )
  const txn = await nftcontract.mint({
    value:utils.parseEther(0.01),
  })
  
  await txn.wait();
  
  }
  catch{
    (err)=>{
      console.error(err);
    }
  }
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


    return presalestarted;


  }catch{(err)=>{
    console.error(err);
    return false;
  }};
  
  

}


const connectwallet = async () => {
  try {
    
    await getproviderorsigner();
    setwalletconnected(true);
  } catch (err) {
    console.error(err);
  }
};


const getproviderorsigner = async (needSigner = false) => {

  const provider = await web3modalref.current.connect();
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


useEffect(() => {
  // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  if (!walletconnected) {
window.alert(walletconnected);

    web3modalref.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    connectwallet();

    
    const _presaleStarted = checkpresalestarted();
    if (_presaleStarted) {
      checkpresaleended()
    }
  } },[walletconnected])


  const renderbutton = ()=>{

    if(!walletconnected){
      return(
        <button onClick={connectwallet} className={styles.button}> Connect Wallet </button>
      )
    }

    if(!presalestarted && isowner){
      return(
        <button onClick={startpresale} className={styles.button}> Start Presale </button>
      )
    }
  
  
    if(!presalestarted){
      <div style={styles.description}> Presale has not started yet, come back later </div>
  
    }
  
    if(presalestarted && !presaleended){
      return(
  
  <button onClick={presalemint}>
  <span className={styles.description}> Mint a CryptoDev Now </span>
  Presale Mint 
  </button>
      )
  
    }
  
    if(presaleended){
  <button onClick={publicsalemint}>
  <span className={styles.description}> Mint a CryptoDev Now </span>
  Public Sale ON!
  </button>
    }
  }


  return (
   <div>
    <Head>
      <title> NFT Minter </title>
    </Head>
  
      <div className={styles.main}>
        <div>
        {renderbutton()}
        </div>
       
      

      </div>
   </div>
  )
}
