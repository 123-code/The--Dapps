// SPDX-License-Identifier: UNLICENSED
pragma solidity ^ 0.8.17;
contract Pool{

mapping(address=>uint) public stakedbalance;
mapping(address => uint) public LPtokens;
mapping(address => bool) public hasstaked;
mapping(address=>bool)public distributed;

uint total;
uint deposit;
//uint amount ;



function DistributeLPs()public{
    require(hasstaked[msg.sender] == true);
    require(distributed[msg.sender] == false,"already received LPs");
    for(uint i=0;i<LPtokens[msg.sender];i++){
deposit += 1;
    }
    LPtokens[msg.sender] = deposit;
    distributed[msg.sender] = true;
}

function getLPsByAddress(address search)public view returns(uint){
return LPtokens[search];
}


function GetAmount() public view returns(uint){
return total;
}


function stake() external payable {
    require(msg.value > 0, "Invalid amount");
    require(msg.value <= address(this).balance, "Insufficient balance");
    uint256 amount = msg.value;
    LPtokens[msg.sender] += amount;
    total += amount;
    (bool sent, ) = payable(address(this)).call{value: amount}("");
    require(sent,"failed to send");
    hasstaked[msg.sender] = true;
    stakedbalance[msg.sender] += amount;
}

 receive() external payable {

 }



      fallback() external payable {}


}