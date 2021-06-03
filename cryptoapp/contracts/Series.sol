// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/ SafeMath.sol';


contract Series is Ownable{
  using SafeMath for uint;
  string public Title;
  uint public contribution;
  uint public min_contribution;

mapping(adress=>uint) public contributions;
// array of contributor addresses
address[] contributors;
uint public lastpublicationblock;

mapping(uint => string) public publications;
uint public publicationCounter;

// Constructor so no one can change variables values.
  constructor(string _Title,uint _contribution,uint _min_contribution)public{
Title = _Title;
contribution = _contribution;
min_contribution = _min_contribution;
owner = msg.sender;

  }

function Contribute() public payable{

//require(contributions[msg.sender] + msg.value >= min_contribution,"Your contribution Does not meet the minimmun");
require(contributions[msg.sender].add(msg.value)>=min_contribution,"Your contribution Does not meet the minimmun");

require(msg.sender != owner,"Owner cannot contribute to himself");

//check if who contributes is already a contributor.
bool  contrib = false;
for(i=0;i<contributors.length;i++){
  if(contributors[i]==msg.sender){
    contrib = true
  }
  
}
if(!contrib){
  contributors.push(msg.sender);
}
contributions[msg.sender] = contributions[msg.sender].add(msg.value);
}

function withdraw()public{
uint amount = contributions[msg.sender];
if(amount>0){
  contributions[msg.sender]=0;
  msg.sender.transfer(amount);
}
} 
function publish(string memory episodelink)public onlyOwner{

}

function end()public onlyOwner{

}
}