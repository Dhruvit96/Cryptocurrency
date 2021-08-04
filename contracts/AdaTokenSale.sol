pragma solidity ^0.5.2;

import "./AdaToken.sol";

contract AdaTokenSale {
    address admin;
    AdaToken public tokenContract;
    uint256 public tokenPrice;

    constructor(AdaToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender; // assign an admin
        tokenContract = _tokenContract; // token contract
        tokenPrice = _tokenPrice; // token price
    }
}
