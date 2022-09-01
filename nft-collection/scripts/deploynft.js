const hre = require("hardhat");
// deployed 0x5FbDB2315678afecb367f032d93F642f64180aa3
require("dotenv").config({ path: ".env" });
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");


const whitelistContract = WHITELIST_CONTRACT_ADDRESS;

const metadataURL = METADATA_URL;

async function main() {
   


  const CryptoDevs = await hre.ethers.getContractFactory("CryptoDevs");
  const cryptodevs = await CryptoDevs.deploy(metadataURL,whitelistContract);

  await cryptodevs.deployed();

  console.log(`Deployed with address:${cryptodevs.address}`);
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
