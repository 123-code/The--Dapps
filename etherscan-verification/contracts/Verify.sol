pragma solidity ^ 0.8.4;


contract Verify{
    string private greeting;

    constructor(){

    }


    function hello(bool sayhello) public pure returns(string memory){
        if(sayhello){
            return "Hello there";
        }
        return"ll";
    }
}