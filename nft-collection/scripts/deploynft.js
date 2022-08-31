const { ethers } = require("hardhat");

const main = async()=>{
    const NFTContract = await ethers.getContractFactory("CryptoDevs");
    const deployednft = await Whitelistcontract.deploy(10);
    await deployednft.deployed();

    console.info(`Deployed NFT Contract Address:${deployednft.address}`)
    
}

main().then(()=>{
   
    console.info("succesful deployment");
    process.exit(0).
    catch((err)=>{
        console.log("ha ocurrido un error !");
        console.log(err);
        process.exit(1);
    })
})