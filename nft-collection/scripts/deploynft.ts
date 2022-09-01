import { deploy } from './ethers-lib'

(async () => {
    try {
        const result = await deploy('CryptoDevs', ['testNFT', 'TNFT'])
        console.log(`address: ${result.address}`)
    } catch (e) {
        console.log(e.message)
    }
  })()