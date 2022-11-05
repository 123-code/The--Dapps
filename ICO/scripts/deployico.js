const {ethers} = require("hardhat");
const { NFT_CONTRACT_ADDRESS } = require("../constants");
require("dotenv").config({path:".env"});



async function main(){
    const CryptoDevsTopkenContract = await ethers.getContractFactory("CrtptoDevToken");
    const deployedCryptoDevsTopkenContract = await CryptoDevsTopkenContract.deploy(NFT_CONTRACT_ADDRESS);

    console.log(`contract deployed with address ${deployedCryptoDevsTopkenContract.address}`)
}

main().then(()=> process.exit(0))
.catch((err)=>{
    console.error(err);
    process.exit(1)
})

//contract deployed with address 0x910e38886631B768A0c34D521f53705611214dFA