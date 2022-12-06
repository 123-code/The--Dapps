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

// modifier giving only passed proposals deadline not exceeded & proposal not executed.

modifier InactiveProposalOnly(uint256 _proposalindex){
    require(nftproposal[_proposalindex].deadline <= block.timestamp,"DEADLINE NOT EXCEEDED");
    require(nftproposal[_proposalindex].executed == false,"PROPOSAL NOT EXECUTED");
    _;
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

function voteonproposal(uint256 _proposalIndex,voteoptions vote ) external NFTHolderOnly
 DeadlineNotExceeded(_proposalIndex){
Proposal storage proposal = nftproposal[_proposalIndex];
uint numoftokens = CryptodevsContract.balanceOf(msg.sender);
uint votes = 0;

for(uint256 i=0;i<numoftokens;i++){
    uint256 TokenID = CryptodevsContract.tokenOfOwnerByIndex(msg.sender,i);
    if(proposal.nftused[TokenID]==false){
votes += 1;
    }
    proposal.nftused[TokenID] = true;
    

}

require(votes > 0,"YOU ALREADY VOTED!!");

if(vote == voteoptions.YES){
proposal.yesvotes += 1;
}    
if(vote == voteoptions.NO){
proposal.novotes += 1;
}
}



function executeproposal(uint256 _proposalindex) external NFTHolderOnly InactiveProposalOnly(_proposalindex){
    // get proposal passed as parameter from nftproposal mapping.
Proposal storage proposal = nftproposal[_proposalindex];

// check if yes votes > no votes
if(proposal.yesvotes > proposal.novotes){
    // if condition true, purchase an nft
    uint256 nftprice = nftMarketplace.getprice();
    // check balances
    require(address(this).balance > nftprice,"not enough funds!");
    nftMarketplace.purchaseNFT{value: nftprice}(proposal._nft_id);

}
proposal.executed = true;
}

// transfers contract ETH balance to address
function withdrawether() external onlyOwner{
    payable(owner()).transfer(address(this).balance);
}

// allow contract to receive ether from a wallet directly
receive() external payable{}
fallback() external payable{{}}
}
