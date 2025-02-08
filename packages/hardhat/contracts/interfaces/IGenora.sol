// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

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
}
