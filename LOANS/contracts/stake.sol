// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;  //Do not change the solidity version as it negativly impacts submission grading

import "hardhat/console.sol";
//import "./ExampleExternalContract.sol";

contract Staker {

  mapping(address=>uint) public balances;
  mapping(address=>uint)public timestamps;

  uint256 public constant RewardRatePerBlock = 0.1 ether;
  uint256 public constant WithdrawDeadline = 1657798400; 
  uint256 public constant LockDeadline = 1657798640;
  uint256 public constant CurrentBlock = 0;
  

   event Stake(address indexed sender,uint256 amount);
   event Received(address,uint);
   event Execute(address indexed sender,uint256 amount);



  //ExampleExternalContract public exampleExternalContract;

  constructor(address exampleExternalContractAddress) {
    //  exampleExternalContract = ExampleExternalContract(exampleExternalContractAddress);
  }

  modifier withdrawalDeadlineReached( bool requireReached ) {
    uint256 timeRemaining = WithdrawalTimeLeft();
    if( requireReached ) {
      require(timeRemaining == 0, "Withdrawal period is not reached yet");
    } else {
      require(timeRemaining > 0, "Withdrawal period has been reached");
    }
    _;
  }


  modifier ClaimDeadline(bool deadline) {
      uint256 claimremaining = claimPeriodLeft();
      if(deadline){
          require(claimremaining==0,"claim deadline not reached yet");
      }
      else{
          require(claimremaining>0,"claim deadline reached!");
      }
_;
  }

  function WithdrawalTimeLeft()public view returns(uint256 timeleft){
      if(block.timestamp>=WithdrawDeadline){
          return(0);
      }
      else{
      return WithdrawDeadline-block.timestamp;
      }

    }

    function claimPeriodLeft()public view returns(uint256 claimleft){
        if(block.timestamp >= LockDeadline){
            return(0);
        }
        else{
            return LockDeadline-block.timestamp;

        }
    }

    function stake() public payable withdrawalDeadlineReached(true) ClaimDeadline(true) {
        balances[msg.sender] = balances[msg.sender] + msg.value;
        timestamps[msg.sender] = block.timestamp;
        emit Stake(msg.sender, msg.value);


    }

 

}
 