pragma solidity ^ 0.8.17;

contract Pool{

mapping(address=>uint) public stakedbalance;
mapping(address => uint) public LPtokens;

function stake() public payable {
    //address (this).transfer(_amount);
    stakedbalance[msg.sender] += msg.value;
    LPtokens[msg.sender] += msg.value;
}

 receive() external payable {}


      fallback() external payable {}


}