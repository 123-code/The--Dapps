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

mapping(uint256=>Proposal) nfttoproposal;
uint256 proposalcounter;

ICryptodevs CryptodevsContract;
IFakeNFTMarketplace nftMarketplace;


//initializes contracts with addreses passen as parameters on constructor & Interfaces. 
constructor(address _nftmarketplace,address _cryptodevcontract)payable{
    CryptodevsContract =  ICryptodevs(_cryptodevcontract);
    nftMarketplace = IFakeNFTMarketplace(_nftmarketplace); 
}

modifier NFTHolderOnly(){
    require(CryptodevsContract.balanceOf(msg.sender)>0,"NOT A DAO MEMBER!!");
    _;
}


function createproposal() external {

}


}