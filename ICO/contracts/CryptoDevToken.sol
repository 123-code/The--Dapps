//SPDX-License-Identifier: UNLICENSED
pragma solidity ^ 0.8.10;

// ERC20 token Contract 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICryptodevs.sol";

contract CrtptoDevToken is ERC20,Ownable{
uint256 claimable = 0;
uint256 public constant tokenprice = 0.001 ether;
uint256 public constant tokenspernft = 10*10**18;
uint public constant maxtokensupply = 10000 *10**18;
ICryptodevs cryptodevnft;
mapping(uint256=>bool) public tokenidsclaimed;

constructor(address _nftcontract) ERC20("CryptoDevToken","CT"){
    // instance of the nftcontract here
    cryptodevnft = ICryptodevs(_nftcontract);
} 

// claims 10 tokens per owned NFT 
function claim()public{
    address sender = msg.sender;
    uint256 balance = cryptodevnft.getebalanceof(sender);
    uint amounttoclaim = 0;
  
    require(balance < 0,"You dont own any nfts");

//claim tokens based on the balance
    for(uint256 i=0;i<balance;i++){
        
        // get tokenID of each NFT owned by msg.sender
        uint256 tokenID = cryptodevnft.tokenOfOwnerByIndex(sender,i);
        if(!tokenidsclaimed[tokenID]){
            tokenidsclaimed[tokenID] = true;
            amounttoclaim += 1;

        }
       require(amounttoclaim > 0,"You jave minted all of your tokens"); 
    }

// the mint function takes a big number as an argument. 
_mint(msg.sender,amounttoclaim * tokenspernft);
}

// minting ERC-20
function mint(uint256 amount) public payable {
    uint256 _requiredamount = tokenprice * amount;
    require(msg.value >= _requiredamount,"Error!");
    uint256 amountindecimals = amount * 10 ** 18;
    require(totalSupply() + amountindecimals  <=  maxtokensupply,"Error");

    _mint(msg.sender,amountindecimals);

}

receive() external payable{}
fallback() external payable{}



}