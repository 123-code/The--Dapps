const { ethers } = require("hardhat");

const main = async()=>{
    const Whitelistcontract = await ethers.getContractFactory("Whitelist");
    const deployedwhitelist = await Whitelistcontract.deploy(10);
    await deployedwhitelist.deployed();

    console.info(`Deployed Whitelist Contract Address:${deployedwhitelist.address}`)
    
}
// contract address: 0xa76C690b3d38c51C603c930FF38066A993E4F497
main().then(()=>{
   
    console.info("succesful deployment");
    process.exit(0).
    catch((err)=>{
        console.log("ha ocurrido un error !");
        console.log(err);
        process.exit(1);
    })
})