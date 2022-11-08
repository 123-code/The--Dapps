import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState,useEffect,useRef } from 'react'
import Web3Modal from 'web3modal'



export default function Home() {
  const [walletconnected,setwalletconnected] = useState(false);
  // user wallet gets connnected when site is first opened 

const getProviderOrSigner = ()=>{
  try{
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider)
    const {chainID} = web3Provider.getNetwork();
    if(chainID !== 5){
      window.alert("not connected to goerli")
      throw new Error("not connected to goerli")
    }

  }catch(err){

  }
}


  const connectwallet = async()=>{
    try{
      await getProviderOrSigner();
      setwalletconnected(true)

    }catch(err){
console.error(err)
    }
  }

  useEffect(()=>{
    const web3ModalRef = useRef();
    if(!walletconnected){
      web3ModalRef.current = new Web3Modal({
        network:'goerli',
        providerOptions:{},
        disableInjectedProvider:false
      })
connectWallet()
    }

  },[])

  return (
    
   <div>
    <Head>
    <title> Cryptodevs ICO </title>
    <meta name="description" content="ICO-DAPP"/>
      </Head>
      <div className={style.main}>
<div>
  <h1 className={styles.title}> Welcome to CryptoDevs ICO </h1>
  <div className = {styles.description}>
    You can mint cryptoDevtokens here 
  </div>
</div>
      </div>
    </div>
  )
}
