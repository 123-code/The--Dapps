import {React,useRef,useState,useEffect} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3Modal, { getProviderInfoFromChecksArray } from 'web3modal';
import { providers,BigNumber,utils, Contract } from "ethers";
import {  ICO_CONTRACT_ADDRESS,ICO_CONTRACT_ABI,NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI } from '../../constants';


 
export default function Home() {
  const zero = BigNumber.from(0);
  const Web3ModalRef = useRef();
  const [walletConnected,setwalletConnected] = useState(false);
  const [tokensminted,settokensminted] = useState(zero);
  const [cryptodevtokenbalance,setcryptodevtokenbalance] = useState(zero);
  const [tokenamount,settokenamount] = useState(zero);
  const[loading,setloading] = useState(false);
  const [tokensToBeClaimed,settokensToBeClaimed] = useState(zero);

 
 

  const connectwallet = async () => {
    try {

      await getProviderOrSigner();
      setwalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };


  const getTokensToBeClaimed = async()=>{
    try{
const provider = await getProviderOrSigner();


const nftcontract = new Contract(NFT_CONTRACT_ADDRESS,NFT_CONTRACT_ABI,provider);
const signer = await getProviderOrSigner(true);
const address = await signer.getAddress();
const balance = await nftcontract.balanceOf(address);

if(balance===zero){
  settokensToBeClaimed(zero)
} else{
  let amount = 0;
  for(let i=0;i<balance;i++){
    const tokenid = await nftcontract.tokenOfOwnerByIndex(address,i)
    const claimed = await tokencontract.tokenIdsClaimed(tokenid)
    if(!claimed){
      amount ++;
    }
  }
  // converts amount into big number
  settokensToBeClaimed(BigNumber.from(amount));
  
}
    }catch(err){
console.error(err);
settokensToBeClaimed(zero);
    }
      
      
  }




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

const getbalanceOfCryptoDevTokens = async()=>{
  try{
const provider = await getProviderOrSigner();
const tokencontract = new Contract(ICO_CONTRACT_ADDRESS,ICO_CONTRACT_ABI,provider);
const signer = await getProviderOrSigner(true);
const address = await signer.getAddress();
// balance of who is deploying contract 
const balance = await tokencontract.balanceOf(address);
settokenamount(balance);
  }catch(err){
    console.error(err);
  }
}

const gettotaltokensmimnted = async()=>{
  try{
    const provider = await getProviderOrSigner();
    const tokencontract = new Contract(ICO_CONTRACT_ADDRESS,ICO_CONTRACT_ABI,provider);

    const _tokensminted  = await tokencontract.totalSupply();
    settokensminted(_tokensminted)
  }
  catch(err){
    console.error(err);
  }
}


const mintcryptodevtoken = async(amount)=>{
try{
const signer = await getProviderOrSigner(true);
const cryptodevcontract = new Contract (ICO_CONTRACT_ADDRESS,ICO_CONTRACT_ABI,signer)
const value  = 0.001 * amount;
const tx = await cryptodevcontract.mint(amount,{
value:utils.parseEther(value.toString())
});
setloading(true)
await tx.wait()
setloading(false)
window.alert("you successfully minted a CryptoDev");
await getbalanceOfCryptoDevTokens();
await gettotaltokensmimnted();
await getTokensToBeClaimed();
}
catch(err){
  console.error(err) 
}
  }


  const claimCryptoDevTokens = async()=>{
    try{
const signer = await getProviderOrSigner(true);
const tokencontract = new Contract(ICO_CONTRACT_ADDRESS,ICO_CONTRACT_ABI,signer);
const tx = await tokencontract.claim();
setloading(true);
await tx.wait();
setloading(false);
window.alert("successfully claimed!!");
await getbalanceOfCryptoDevTokens();
await gettotaltokensmimnted();
await getTokensToBeClaimed();
    }catch(err){
      console.error(err)
    }
  }

const renderbutton = ()=>{


  if(loading){
    return (
     <div>
      <button className={styles.button}>loading... </button>
    </div>
    );
  }

  if(tokensToBeClaimed){
    <div>
      <div className = {styles.description}>
{tokensToBeClaimed*10} Tokens yet to claim!!
      </div>
      <button className={styles.button} onClick={claimCryptoDevTokens}> Claim now !  </button>
    </div>
  }



  return(
    <>
    <div style = {{display:'flex-col'}}>
    
<input type="number" placeholder="amount of tokens" onChange={(e)=>settokenamount(BigNumber.from(e.target.value))}/>
<button onClick = {()=> mintcryptodevtoken(tokenamount)} className={styles.button} disabled={!(tokenamount>0)}> Mint </button>
    </div>
    </>

  )
}

    useEffect( ()=>{
      if(!walletConnected){
        Web3ModalRef.current = new Web3Modal({
          network:"goerli",
          providerOptions:{},
          disableInjectedProvider:false,
        });
        connectwallet();
        getbalanceOfCryptoDevTokens();
 gettotaltokensmimnted();
 getTokensToBeClaimed();
      }


    },[walletConnected])

  


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
{renderbutton()}
</div>


 <div></div>

</div>
   </div>
   <footer className={styles.footer}>
    Made with &#10084;
   </footer>
   </>
  )
}