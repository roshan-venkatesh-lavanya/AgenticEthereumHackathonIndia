// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GrowToken.sol";

interface IMilestoneManager {
    function isMilestoneCompleted(address farmer, uint index) external view returns (bool);
}

contract EscrowContract {
    GrowToken public token;
    IMilestoneManager public milestoneManager;

    struct Installment {
        uint256 amount;
        bool released;
    }

    mapping(address => Installment[]) public farmerInstallments;

    constructor(address tokenAddress, address milestoneAddress) {
        token = GrowToken(tokenAddress);
        milestoneManager = IMilestoneManager(milestoneAddress);
    }

    function createInstallments(address farmer, uint256[] memory amounts) public {
        delete farmerInstallments[farmer];
        for (uint i = 0; i < amounts.length; i++) {
            farmerInstallments[farmer].push(Installment(amounts[i], false));
        }
    }

    function releaseInstallment(address farmer, uint index) public {
        require(milestoneManager.isMilestoneCompleted(farmer, index), "Milestone not completed");

        Installment storage inst = farmerInstallments[farmer][index];
        require(!inst.released, "Already released");

        inst.released = true;
        token.transfer(farmer, inst.amount);
    }

    function getInstallments(address farmer) external view returns (Installment[] memory) {
        return farmerInstallments[farmer];
    }
}
