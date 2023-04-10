import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { ethers, providers } from "ethers";
import { useEffect, useRef, useState } from "react";

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  const web3ModalRef = useRef();

  const [ens, setENS] = useState("");
 
  const [address, setAddress] = useState("");

  const SetENSOrAddress = async()=>{
    const ens = await web3provider.lookupAddress(address);
    if(ens){
      setENS(ens);
    }
    else{
      setAddress(address);
    }
  }
  const getProviderOrSigner = async () => {
    
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5pu) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }
    const signer = web3Provider.getSigner();
    
    const address = await signer.getAddress();
    
    await SetENSOrAddress(address, web3Provider);
    return signer;
  };

  
  const connectWallet = async () => {
    try {
     
      await getProviderOrSigner(true);
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  
  const renderButton = () => {
    if (walletConnected) {
      <div>Wallet connected</div>;
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };


  useEffect(() => {
    
    if (!walletConnected) {
     
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <>
      <Head>
        <title>ENS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Welcome to the ENS App: {ens ? ens : address}!
          </h1>
          <div className={styles.description}>It&#39;s an NFT collection for LearnWeb3 Punks.</div>
        </div>
{renderButton()}
<footer className={styles.footer}>
        Made with &#10084; by LearnWeb3 Punks
      </footer>
      </div>
    </>
  )
}
