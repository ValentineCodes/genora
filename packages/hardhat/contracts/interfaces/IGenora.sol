// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { DataTypes } from "../protocol/libraries/DataTypes.sol";

/**
 * @title IGenora
 * @dev Interface for the Genora contract, defining its events.
 */
interface IGenora {
    // ==========================
    // Events
    // ==========================

    /**
     * @dev Emitted when a new proposal is created.
     * @param id Unique identifier for the proposal.
     * @param title Title of the proposal.
     * @param description Brief description of the proposal.
     * @param proposer Address of the user who created the proposal.
     * @param recipientAddress Address that will receive funds if the proposal is funded.
     * @param timestamp Timestamp when the proposal was created.
     */
    event ProposalAdded(
        uint256 indexed id,
        string title,
        string description,
        address indexed proposer,
        address indexed recipientAddress,
        uint256 timestamp
    );

    /**
     * @dev Emitted when a donation is made to a proposal.
     * @param id Unique identifier of the proposal receiving the donation.
     * @param donor Address of the user making the donation.
     * @param amount Amount of ETH donated.
     * @param timestamp Timestamp of when the donation occurred.
     */
    event Donated(uint256 indexed id, address indexed donor, uint256 amount, uint256 timestamp);

    /**
     * @notice Creates a new proposal.
     * @dev Ensures the proposal has valid inputs before storing it.
     * @param _proposal Struct containing proposal details such as title, description, and recipient address.
     */
    function propose(DataTypes.ProposalParams calldata _proposal) external;

    /**
     * @notice Allows users to donate to a specific proposal.
     * @dev Ensures the proposal exists and that the donation amount is greater than zero.
     *      Transfers the donated amount to the proposal's recipient.
     *      Stores donation details and tracks donor contributions.
     * @param _id The unique identifier of the proposal to donate to.
     */
    function donate(uint256 _id) external payable;
}
