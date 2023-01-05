pragma solidity ^ 0.8.17;
//call to Pool.stakedbalance errored: Error encoding arguments: Error: invalid address (argument="address", value="", code=INVALID_ARGUMENT, version=address/5.5.0) (argument=null, value="", code=INVALID_ARGUMENT, version=abi/5.5.0)
contract Pool{

mapping(address=>uint) public stakedbalance;
mapping(address => uint) public LPtokens;
uint total;
uint deposit;

function stake() public payable {
    //address (this).transfer(_amount);
   
}

function DistributeLPs()public  returns(uint){
    for(uint i=0;i<LPtokens[msg.sender];i++){
deposit += 1;
    }
    return deposit;
}

 receive() external payable {
     stakedbalance[msg.sender] += msg.value;
     LPtokens[msg.sender] += msg.value;
     total += msg.value;
 }



      fallback() external payable {}


}