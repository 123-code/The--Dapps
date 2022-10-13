//SPDX-License-Identifier: UNLICENSED
pragma solidity ^ 0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// contract still needs to be tested. 
contract Escrow is ERC721Enumerable{
   /*
   each of the parts desposits an ERC20 token, if both
   confirm they have received the other's, swap is executed, 
   otherwise nothing happens.
   */
address payable public  buyer;
address payable public seller;
uint256 public  amount;
string public baseuri;
mapping(address=>bool) public isseller;
mapping(address=>bool) public isbuyer;
mapping(address=>bool)public moneysent;
mapping(address=>bool)public productsent;


modifier requireisseller(address user){
    require(isseller[user] = true,"You are not a seller");
    _;
}

modifier requireisbuyer(address user){
    require(isbuyer[user] = true,"not a buyer!");
    _;
}

constructor(string memory _baseuri)ERC721("Escrow","ET"){
      baseuri = _baseuri;
      }

function registerseller()public{
    isseller[msg.sender] = true;

}

function registerbuyer()public{
    isbuyer[msg.sender] = true;

}

function mint() public payable requireisbuyer(msg.sender){
     _safeMint(msg.sender, 1);
} 

function addamount(uint256 _amount)public{
    require(_amount > 0 ,"Invalid Price");
    amount = _amount;

}

// both functions let users confirm the agreement was successful. 
function confirmmoney(uint256 _amount) public requireisseller(msg.sender) {
require(_amount >= amount,"Invalid amount");
moneysent[msg.sender] = true;
}

function confirmproduct() public requireisbuyer(msg.sender) {
productsent[msg.sender] = true;

}

/*
funcion supposed to send ether from buyer
to seller & ERC20 from seller to buyer,
ERC20 is minted once a product for sale
is posted. 
*/
function saleended(address _buyer,  address _seller,address _spender )public payable  {
require(productsent[_seller] == true && moneysent[_buyer]== true);
(bool sent,) = _buyer.call{value:amount}("");
require(sent);
approve(_spender,1);
transferFrom( _seller, _buyer,1);


}


   
}