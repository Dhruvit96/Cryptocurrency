pragma solidity ^0.5.2;

contract AdaToken {
    
	string public name = "ADA Token";
	string public symbol = "ADA";
	string public standard = "ADA Token v1.0";

	uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

	constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

}