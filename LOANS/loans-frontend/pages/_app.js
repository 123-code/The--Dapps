import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
 
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import Profile from './'
import '../styles/globals.css'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: 'https://goerli.infura.io/v3/682c39bac1294baeb74ae767786db1ca' }), publicProvider()],
)


const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }) {
  <WagmiConfig client={client}>
  <Profile />
</WagmiConfig>
}

export default MyApp
