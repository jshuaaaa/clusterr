// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.4;

contract groupPayment {
    constructor() payable {}


    function deposit(uint amount, address payable groupOwner) public payable {
        require(msg.value == amount);
        uint value = amount * 95/100;
        payGroupOwner(groupOwner, value);
    }

    function payGroupOwner(address payable groupOwner, uint amount) internal {
        groupOwner.transfer(amount);
    }


    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }


}