const { ethers } = require("hardhat");

const main = async()=>{
    const Whitelistcontract = await ethers.getContractFactory("Whitelist");
    const deployedwhitelist = await Whitelistcontract.deploy(10);
    await deployedwhitelist.deployed();

    console.info(`Deployed Whitelist Contract Address:${deployedwhitelist.address}`)
    
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