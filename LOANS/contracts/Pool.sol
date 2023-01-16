pragma solidity ^ 0.8.17;
//call to Pool.stakedbalance errored: Error encoding arguments: Error: invalid address (argument="address", value="", code=INVALID_ARGUMENT, version=address/5.5.0) (argument=null, value="", code=INVALID_ARGUMENT, version=abi/5.5.0)
contract Pool{

mapping(address=>uint) public stakedbalance;
mapping(address => uint) public LPtokens;
mapping(address => bool) public hasstaked;

uint total;
uint deposit;
uint amount;


function stake(uint256 _amount) public payable {
    //address (this).transfer(_amount);
    amount = _amount;
}

/*There is no mechanism in place to prevent malicious users from calling the "DistributeLPs" 
function multiple times and receiving more LP tokens than they are entitled to.*/
function DistributeLPs()public returns(uint){
    require(hasstaked[msg.sender] == true);
    for(uint i=0;i<LPtokens[msg.sender];i++){
deposit += 1;
    }
    LPtokens[msg.sender] = deposit;
    return deposit;
    
}

 receive() external payable {
     //require(msg.sender)
    require(msg.value > 0.001 ether);
     stakedbalance[msg.sender] += msg.value;
     LPtokens[msg.sender] += msg.value;
     total += msg.value;
    payable(address(this)).transfer(amount);
 }



      fallback() external payable {}


}