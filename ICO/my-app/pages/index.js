import {React,useRef,useState,useEffect} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3Modal, { getProviderInfoFromChecksArray } from 'web3modal';
import { providers,BigNumber,utils } from "ethers";
import { ICO_CONTRACT_ABI } from '../../constants';

 
export default function Home() {
  const zero = BigNumber.from(0);
  const Web3ModalRef = useRef();
  const [walletConnected,setwalletConnected] = useState(false);
  const [tokensminted,settokensminted] = useState(zero);
  const [cryptodevtokenbalance,setcryptodevtokenbalance] = useState(zero);
  const [tokenamount,settokenamount] = useState(zero);

 
 

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
// 1+1 

  const mintcryptodevtoken = async(amount)=>{
try{
const signer = getProviderOrSigner(true);
const cryptodevcontract = new Contract (ICO_CONTRACT_ADDRESS,ICO_CONTRACT_ABI,signer)
const value  = 0.001 * amount;
cryptodevcontract.mint(amount,{
value:utils.parseEther(value.toString())
})
}
catch(err){
  console.error(err) 
}
  }

const renderbutton = ()=>{
  return(
    <>
    <div style = {{display:'flex-col'}}>
<input type="number" placeholder="amount of tokens" onChange={(e)=>{settokenamount(BigNumber.from(e.target.value))}}></input>
<button className={styles.button} disabled={!(tokenamount>0)}> Mint </button>
    </div>
    </>

  )
}

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
    <>
   <div>
    <Head>
    
    </Head>
    <h1 >Welcome to Crypto Devs ICO!</h1>
<div className={styles.main}>

<div>
{!walletConnected ? (<button onClick={connectwallet} className={styles.button}> connect wallet </button>)
:
<div> overall {utils.formatEther(tokensminted)}/10000 have been minted </div>}
<div className={styles.description}> You have minted {utils.formatEther(cryptodevtokenbalance)} cryptodevtokens </div>
</div>


 

</div>
   </div>
   </>
  )
}