// SPDX License-Identifier:MIT

pragma solidity ^0.8.9;

import"@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sol";
 


contract CryptoDevs is ERC721Enumerable, Ownable{

string _basetokenuri;
IWhitelist whitelist;
bool public presalestarted;
uint public tokenids;
uint public maxtokenids = 20;
uint public price = 0.01 ether;




constructor(string memory base_uri, address whitelistcontract) ERC721("CryptoDevs","CD"){
_basetokenuri = base_uri;
whitelist = IWhitelist(whitelistcontract);


}


modifier notpaused {
    require(!paused,"Error");

    _;
    
}


function startPresale() public onlyOwner{
    presalestarted = true;
    presaleended = block.timestamp + 10 minutes;
   
    

    


}

function PresaleMint() public payable notpaused {
 require(presalestarted && block.timestamp < presaleended,"presale has ended");
    require(whitelist.Whitelistedaddresses(msg.sender));
    require(tokenids < maxtokenids,"Presale has ended :(");
    require(msg.value >= price,"transaction Error");

    tokenids +=1;

    _safeMint(msg.sender,tokenIds);
    
}

function Mint() public payable{
    require(presalestarted && block.timestamp > presaleended,"presale is ongoing!");
    require(tokenids < maxtokenids,"Presale has ended :(");
    require(msg.value >= price,"transaction Error");
    _safeMint(msg.sender,tokenIds);



}


function _baseURI() internal view override returns(string memory){
return "";

}

receive() external payable;
fallback() external payable;

function withdraw() public onlyOwner{
    address _owner = owner();
    uint amount = address(this).balance;

    (bool sent,) = _owner.call{value:amount}("");
    require(sent,"failed to send ether");

    
}

// function used to prevent contract exploits.
function setPaused(bool val) public onlyOwner{
    _paused = val ;
}

}