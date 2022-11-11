import {React,useRef,useState,useEffect} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal';
import { providers,BigNumber } from "ethers";


 
export default function Home() {
  const zero = BigNumber.from(0);
  const Web3ModalRef = useRef();
  const [walletConnected,setwalletConnected] = useState(false);
  const [tokensminted,settokensminted] = useState(zero);



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
    if (chainId !== 5) {
      window.alert("Change the network to goerli");
      throw new Error("Change network to goerli");
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
          network:"goerli",
          providerOptions:{},
          disableInjectedProvider:false,
        });
        connectwallet();
      }


    },[])

  


  return(
   <div>
    <Head>
    
    </Head>
    <h1 >Welcome to Crypto Devs ICO!</h1>
<div className={styles.main}>

<div>
{!walletConnected ? (<button onClick={connectwallet} className={styles.button}> connect wallet </button>)
: <div> connected </div>}
</div>


 

</div>
   </div>
     
  )
}