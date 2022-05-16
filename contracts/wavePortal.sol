// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract wavePortal {
    uint256 totalWaves;
    uint256 private seed;
    mapping(address => uint256) waveBank;

    // an event to notify the frontend of an action
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address Waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log('Yo! The machine raves on! Koha, the computational alchemist!');
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15m");
        lastWavedAt[msg.sender]  = block.timestamp;

        totalWaves += 1;
        seed = (block.timestamp + block.difficulty) % 100;

        console.log("Random # generated: %d", seed);

        console.log("%s waved w/ message %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));

       
     if (seed <= 50) {
        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
     }
     emit NewWave(msg.sender, block.timestamp, _message);

    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }
}