// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

/**
 * @title DataTypes
 * @dev A library defining common data structures used in the Genora contract.
 */
library DataTypes {
    /**
     * @dev Structure representing a proposal.
     * @param id Unique identifier for the proposal.
     * @param title The title of the proposal.
     * @param description A brief description of the proposal.
     * @param proposer Address of the user who created the proposal.
     * @param recipientAddress Address that will receive the funds if the proposal is funded.
     * @param timestamp The timestamp when the proposal was created.
     */
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        address recipientAddress;
        uint256 timestamp;
    }

    /**
     * @dev Structure representing input parameters for creating a proposal.
     * @param title The title of the proposal.
     * @param description A brief description of the proposal.
     * @param recipientAddress Address that will receive the funds if the proposal is approved.
     */
    struct ProposalParams {
        string title;
        string description;
        address recipientAddress;
    }

    /**
     * @dev Structure representing a donation made to a proposal.
     * @param donor The address of the donor.
     * @param amount The amount donated.
     * @param timestamp The timestamp when the donation was made.
     */
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }
}
