// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FarmerRegistry {
    struct Farmer {
        string name;
        string region;
        string cropType;
        bool isRegistered;
    }

    mapping(address => Farmer) public farmers;

    function registerFarmer(string memory name, string memory region, string memory cropType) external {
        require(!farmers[msg.sender].isRegistered, "Already registered");
        farmers[msg.sender] = Farmer(name, region, cropType, true);
    }

    function getFarmer(address farmer) public view returns (Farmer memory) {
        return farmers[farmer];
    }
}
