// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.4;

contract groupPayment {
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }


    function deposit(uint amount, address payable groupOwner) public payable {
        require(msg.value == amount);
        uint value = amount * 95/100;
        payGroupOwner(groupOwner, value);
    }

    function payGroupOwner(address payable groupOwner, uint amount) internal {
        groupOwner.transfer(amount);
    }

    function withdraw(address payable to, uint amount) public payable {
        require(msg.sender == owner);
        to.transfer(amount);
    }


    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }


}