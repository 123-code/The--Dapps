
const hre = require("hardhat");

async function main() {
const nftmarketplaceaddress = '0x5755071E758Eb2C9F3fb3D81b78dEAA2A006C741'
const cryptodevtokencontractaddress = '0xe7F0d7931A7Bf39CE3F7EE82505e05Ce1436a7D7'


  const DaoContract = await hre.ethers.getContractFactory("MyDAO");
  const daocontract = await DaoContract.deploy(nftmarketplaceaddress,cryptodevtokencontractaddress);

  await daocontract.deployed();

  console.log(
    `deployed to ${daocontract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
