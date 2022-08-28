// SPDX License-Identifier:MIT

pragma solidity ^0.8.4;

interface Whitelist{
    function whitelistaddress(address) external view returns(bool);
    
}