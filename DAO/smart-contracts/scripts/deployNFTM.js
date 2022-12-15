
const hre = require("hardhat");

async function main() {



  const NFTContract = await hre.ethers.getContractFactory("FakeNFTMarketplace");
  const nftcontract = await NFTContract.deploy();

  await nftcontract.deployed();

  console.log(
    `deployed to ${nftcontract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
