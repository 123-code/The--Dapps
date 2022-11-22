//SPDX-License-Identifier: UNLICENSED
pragma solidity ^ 0.8.17;

contract FakeNFTMarketplace{
mapping(uint256=>address) public tokens;
uint256 nft_price = 0.01 ether;

function purchaseNFT(uint256 _token_id) external payable{
    require(msg.value >= nft_price,"Not enough funds!");
    tokens[_token_id] = msg.sender;
}

function getprice() external view returns(uint256){
    return nft_price;
}

function checkisavailable(uint256 _token_id) external view returns(bool){
    if(
        tokens[_token_id] == address(0)
    ){
        return true;
    }
      return false;
    
}
}