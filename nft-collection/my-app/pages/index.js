import {React,useRef,useState,useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal';
import ethers, { Contract,utils } from "ethers";
import { providers } from "ethers";

import {NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI} from "../constants";
 
export default function Home() {
  const Web3ModalRef = useRef();
  const [walletConnected,setwalletConnected] = useState(false);
  const [presaleStarted,setpresaleStarted] = useState(false);
  const [presaleended,setpresaleended] = useState(false);
  const [isowner,setisowner] = useState(false);
//nftcontract.getowner
const presalemint = async()=>{
 try{
const signer = await getProviderOrSigner(true);
const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer);
const txn = await nftcontract.presaleMint({
  value:utils.parseEther("0.01"),
}); 
await txn.wait();
window.alert("You have minted a cryptoDev!")
 }catch(err){
  console.error(err)
 }
}
const publicmint = async()=>{
  try{
    const signer = await getProviderOrSigner(true);
    const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer);
    const txn = await nftcontract.mint({
      value:utils.parseEther("0.01"),
    }); 
    await txn.wait();
    window.alert("You have minted a cryptoDev!")
     }catch(err){
      console.error(err)
     }
}
const getowner = async()=>{
  try{
    const provider = await getProviderOrSigner();
    const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
    const owner = await nftcontract.owner();
    const signer = await getProviderOrSigner(true);
    const useraddress = await signer.getAddress();

    if(useraddress.toLowerCase() === owner.toLowerCase()){
      setisowner(true)
    }

  
  }
  catch(err){
    console.error(err)
  }

}
//
  const startpresale = async()=>{
    try{
      const signer = await getProviderOrSigner(true);
      const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,signer);
      const txn = await nftcontract.startPresale();
      await txn.wait();
      setpresaleStarted(true); 
    }catch(err){console.error(err);}
  }

  const checkpresalestarted = async()=>{
    try{
      const provider = await getProviderOrSigner();
      const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
      const _presalestarted = await nftcontract.presaleStarted();
      if(_presalestarted){
        await getowner();
      }
      setpresaleStarted(_presalestarted);
      return _presalestarted;
    }
    catch(err){
      console.error(err);
      return false;
    }
  }

const checkpresaleneded = async()=>{
  try{
    const provider = await getProviderOrSigner();
    const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
    const presaleended = await nftcontract.presaleEnded();
    const currenttimesec = Date.now()/1000;

    const haspresaleended = presaleended.lt(Math.floor((currenttimesec)));
    setpresaleended(haspresaleended);

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
      const signer =  await web3Provider.getSigner();
      
      return signer;
    }
    return web3Provider;
  };

  const onpageload = async()=>{
    await connectwallet();
    await getowner();
    const presalestarted = await checkpresalestarted();
    if(presalestarted){
      const presaleended = await checkpresaleneded();

    }

  }
    useEffect(()=>{
      if(!walletConnected){
        Web3ModalRef.current = new Web3Modal({
          network:"rinkeby",
          providerOptions:{},
          disableInjectedProvider:false,
        });
        
        onpageload();
      }


    },[])

    function renderbody(){
      if(!walletConnected){
        return(
          <button onClick={connectwallet} className={styles.button}> Connect Wallet </button>
        )
      }
      if(isowner && !presaleStarted){
        return(
          <button onClick={startpresale} className={styles.button}>Start presale</button>
        )

      }

      if(!presaleStarted){
        <div>
          <span className={styles.description}> Presale has
          not started, come back later!
          </span>
        </div>


      }

      if(presaleStarted && !presaleended){
        <div>
          <span className={styles.description}>Presale Started </span>
          <button className={styles.description} onClick={presalemint}> Presale Mint </button>
        </div>
        

      }

      if(presaleended){
return(
  <div>
  <span className={styles.description}>Presale Ended, mint in regular sale </span>
  <button className={styles.description} onClick={publicmint}> Regular Mint  </button>
</div>
)
      }
    }

  return(
   <div>
    <Head>
      <title> CryptoDevs NFT</title>
    </Head>
<div className={styles.main}>
  
{renderbody()}
    

</div>
   </div>
    
  )
}

