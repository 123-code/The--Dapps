pragma solidity ^ 0.8.9;

interface ICryptodevs{
    //the input is the address and the index, and the output is the tokenID
    // check token ID hasn't already been used.
    function tokenOfOwnerByIndex(address owner,uint256 index)external view returns(uint256 tokenid);
    // the input is the address of the NFT owner, the output id the balance in the NFT contract.
    function getebalanceof(address owner) external view returns(uint256 balance );
}