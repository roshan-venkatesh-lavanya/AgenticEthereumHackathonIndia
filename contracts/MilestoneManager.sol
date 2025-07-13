// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MilestoneManager {
    struct Milestone {
        string description;
        uint deadline;
        bool completed;
    }

    mapping(address => Milestone[]) public farmerMilestones;

    function createMilestones(address farmer, string[] memory descriptions, uint[] memory deadlines) external {
        require(descriptions.length == deadlines.length, "Mismatched input lengths");
        delete farmerMilestones[farmer];
        for (uint i = 0; i < descriptions.length; i++) {
            farmerMilestones[farmer].push(Milestone(descriptions[i], deadlines[i], false));
        }
    }

    function markMilestoneComplete(address farmer, uint index) external {
        require(index < farmerMilestones[farmer].length, "Invalid index");
        farmerMilestones[farmer][index].completed = true;
    }

    function isMilestoneCompleted(address farmer, uint index) external view returns (bool) {
        require(index < farmerMilestones[farmer].length, "Invalid index");
        return farmerMilestones[farmer][index].completed;
    }

    function getMilestones(address farmer) external view returns (Milestone[] memory) {
        return farmerMilestones[farmer];
    }
}
