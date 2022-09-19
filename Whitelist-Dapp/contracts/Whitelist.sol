pragma solidity ^ 0.8.9;

contract Whitelist{
    uint public maxwhitelistedaddresses;
    uint public numAddressesWhitelisted;

    mapping(address=>bool) whitelisted;

    constructor(uint8 _maxwhitelistedaddresses)  {
maxwhitelistedaddresses = _maxwhitelistedaddresses;
    }


function WhitelistAddress()public{
    require(!whitelisted[msg.sender],"address already whitelisted!");
    require(numAddressesWhitelisted<maxwhitelistedaddresses,"max amount");

    whitelisted[msg.sender] = true;
    numAddressesWhitelisted += 1;





}



}