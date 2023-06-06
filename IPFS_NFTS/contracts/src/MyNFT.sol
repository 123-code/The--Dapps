pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// ADDRESS: 0xeE36cE13936bbCdf05872d6FC36Dd371DF43F867

contract MyNFT is ERC721Enumerable,Ownable{
    //using String for uint256;
    string _baseTokenURI;

    uint public _price = 0.01 ether;
    bool public _paused;
    uint public _maxtokenIDs = 10;
    uint256 public tokenIDs;


    modifier whenNotPaused() {
        require(!_paused,"contract is paused");
        _;
    }


    constructor (string memory baseURI) ERC721("JoseN", "JN3") {
        _baseTokenURI = baseURI;
    }


    function mint()public payable whenNotPaused{
        require(tokenIDs < _maxtokenIDs,"Sold out");
        require(msg.value >= _price,"Incorrect Value Sent");
        tokenIDs++;
        _safeMint(msg.sender,tokenIDs);
    }

    function _baseURI() internal virtual view override returns(string memory){
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId ) public virtual view override returns(string memory){
        require(_exists(tokenId),"ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length>0 ? string(abi.encodePacked(baseURI,Strings.toString(tokenId),'.json')):"";
    }

    function pause(bool val) public onlyOwner{
        _paused = val;
    }


    function Withdraw() public payable onlyOwner{
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent,) = _owner.call{value:amount}("");
        require(sent,"Failed to send Ether");

    }


    fallback() external payable{

    }

    receive() external payable{

    }


}