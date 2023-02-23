pragma solidity ^ 0.8.18;

import "hardhat/console.sol";
import { StringUtils } from "./libraries/StringUtils.sol";

contract Domains{
// mapping of which address registered which domain
mapping(string=>address) public registrations;

// content mapping
mapping(string=>string) public content;

constructor(){
    console.log("Deployed Domains contract");
}

function registerdomain(string calldata name) public{
    require(registrations[name]==address(0),"Domain registered already");
    registrations[name] = msg.sender;
    console.log("Registered domain %s for %s", name, msg.sender);
}

function getowneraddress(string calldata name) public view returns(address){
    return registrations[name];
}

function setcontent(string calldata name,string calldata content)public{
    require(registrations[name]==msg.sender,"You are not the owner of this domain");
    content[name] = content;
}

function getcontent(string calldata name) public view returns(string){
return content[name];
}





}