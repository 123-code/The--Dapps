//SPDX-License-Identifier: UNLICENSED
pragma solidity ^ 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

interface ICryptodevs{
function balanceOf(address owner) external view returns (uint256);
function tokenOfOwnerByIndex(address owner, uint256 index)
        external
        view
        returns (uint256);
}


interface IFakeNFTMarketplace{
    function purchaseNFT(uint256 _token_id) external payable;
    function getprice() external view returns(uint256);
    // check if specific NFT is available.
    function checkisavailable(uint256 _token_id) external view returns(bool);
}

contract MyDAO is Ownable{
/*
store proposals in contract state
allow new proposal creation
allow proposal voting 
execute proposals.
*/

struct Proposal{
    uint256 _nft_id;
    bool executed;
    uint256 yesvotes;
    uint256 novotes;
    uint256 deadline;
    mapping(uint256=>bool) nftused;
}

mapping(uint256=>Proposal) nftproposal;
uint256 proposalcounter;

ICryptodevs CryptodevsContract;
IFakeNFTMarketplace nftMarketplace;


//initializes contracts with addreses passen as parameters on constructor & Interfaces. 
constructor(address _nftmarketplace,address _cryptodevcontract)payable{
    CryptodevsContract =  ICryptodevs(_cryptodevcontract);
    nftMarketplace = IFakeNFTMarketplace(_nftmarketplace); 
}

// modifiers.
modifier NFTHolderOnly(){
    require(CryptodevsContract.balanceOf(msg.sender)>0,"NOT A DAO MEMBER!!");
    _;
}

modifier DeadlineNotExceeded(uint256 pindex){
    require(block.timestamp < nftproposal[pindex].deadline,"DEADLINE EXCEEEDED"); _;
}


// gets the token id to buy  as input to create proposal;
function createproposal(uint256 _token_id) external NFTHolderOnly returns(uint256){
require(nftMarketplace.checkisavailable(_token_id),"NFT not available");
// Proposal struct instance 
Proposal storage proposal = nftproposal[proposalcounter];
proposal._nft_id = _token_id;
proposal.deadline = block.timestamp + 5 minutes;
proposalcounter += 1;
return proposalcounter-1;
}

// enum listing only two possible options for a vote
enum voteoptions{
    YES,
    NO 
}




}
