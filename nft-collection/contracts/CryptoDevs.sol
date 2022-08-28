// SPDX License-Identifier:MIT

pragma solidity ^0.8.4;

import"openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import"openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist";
 



contract CryptoDevs is ERC721Enumerable, Ownable{

string _basetokenuri;
Iwhitelist whitelist;

constructor(string memory base_uri, address whitelistcontract) ERC721("CryptoDevs","CD"){
_basetokenuri = base_uri;
whitelist = Iwhitelist(whitelistcontract);


}

}