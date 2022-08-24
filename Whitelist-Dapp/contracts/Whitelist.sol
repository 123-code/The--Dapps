pragma solidity ^ 0.8.4;

contract Whitelist{
    uint maxaddreses;
    uint whitelisted;
    mapping(address=>bool) public whitelist;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxaddreses =  _maxWhitelistedAddresses;
    }

    function addtowhitelist()public{
        require(whitelist[msg.sender] != true);
        require(whitelisted < maxaddreses,"max number exceeded");
        whitelist[msg.sender] = true;
        whitelisted += 1;
        

    }

    function whitelistedaddress(address _address)public view returns(bool){
    if(whitelist[msg.sender]!=false{
    return true;
    }
    else{
    return false; 
    }


    }

     
     

} 