pragma solidity ^ 0.8.9;

interface ICryptodevs{
    function tokenOfOwnerByIndex(address owner,uint256 index)external view returns(uint256 tokenid);
    function getebalanceof(address owner) external view returns(uint256 balance );
    


    
}