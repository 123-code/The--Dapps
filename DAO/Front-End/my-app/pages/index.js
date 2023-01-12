import {Contract,providers} from 'ethers';
import { formatEther } from "ethers/lib/utils";
import Head from 'next/head';
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { MY_DAO_CONTRACT_ADDRESS,
  MY_DAO_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI
} from '../constants.js';
import styles from "../styles/Home.module.css";

export default function Home() {
  // change connectwalet settings to goerli
  // react hooks at the top 
  const Web3ModalRef = useRef();
  const [walletConnected,setwalletConnected] = useState(false);
  const [loading,setloading] = useState(false);
  const [isOwner,setIsOwner] = useState(false);



  const getDAOowner = async()=>{
    try{
      const signer = getProviderOrSigner(true);
      const DAOcontract =  getDAOcontractInstance(true);
   
      const _owner = await DAOcontract.owner();
   
      const address = signer.getaddress();
   
      if(address.toLowerCase() === _owner.toLowerCase()){
       setIsOwner(true);
      }
    }catch(err){
      console.error(err)
    }
  }

const GetNumberProposalsInDAO  = async ()=>{
  try{
    const signer = await getProviderOrSigner(false)
    const daocontract = getDAOcontractInstance(signer)
    const numberofproposals = daocontract.proposalcounter()
    return numberofproposals
  }catch(err){
    console.error(err)
  }


}

// fix contract instance function 
const getuserNFTbalance = async()=>{
  try{
const signer = await getProviderOrSigner(true);
const daocontract = getDAOcontractInstance(signer);
const balance = await nft

  }catch(err){

  }
}

  const CreateProposal = async ()=>{
    try{
const signer = getProviderOrSigner(true)
const daocontract = getDAOcontractInstance(signer)
const tx = await daocontract.createproposal(faketokenid)
setloading(true)
await tx.wait()
await GetNumberProposalsInDAO()
setloading(false)

    }catch(err){
      console.error(err);
      window.alert(err.data.message)
    }
  }


  const voteonproposal = async()=>{
  
    try{
      const signer = await getProviderOrSigner(true);
     const contract = getDAOcontractInstance(signer);
     const tx = await contract.voteonproposal();
     await tx.wait();
      
          }catch(err){
            console.error(err);
            window.alert(err.data.message)
          }
  }



const getDAOcontractInstance = (getProviderOrSigner)=>{
  
  return new Contract(MY_DAO_CONTRACT_ADDRESS,MY_DAO_CONTRACT_ABI,getProviderOrSigner);
}


const getNFTContractInstance = async(getProviderOrSigner)=>{
return  new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,getProviderOrSigner);
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
    }


  },[])


  return (
    <>
     <div>
    <Head>
      <title> My DAO </title>
    </Head>
<div className={styles.main}>
  
{!walletConnected ? (<button onClick={connectwallet} className={styles.button}> connect wallet </button>)
: null}
    

</div>
   </div>
    
    </>
  )
}

/** import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

if contract tests dont work, change proposalcounter
to numProposals
on contract and redeploy 

*/