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
     * @dev Emitted when the fee collector withdraws accumulated fees.
     * @param collector The address of the fee collector withdrawing the funds.
     * @param amount The amount of fees withdrawn.
     */
    event FeeWithdrawn(address indexed collector, uint256 amount);

    /**
     * @dev Emitted when the fee collector address is updated.
     * @param oldCollector The previous fee collector address.
     * @param newCollector The new fee collector address.
     */
    event FeeCollectorUpdated(address indexed oldCollector, address indexed newCollector);

    // ==========================
    // Functions
    // ==========================

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

    /// @notice Withdraws accumulated fees to the fee collector.
    function withdrawFees() external;

    /// @notice Updates the fee collector address.
    /// @dev Only the current fee collector can call this.
    /// @param _newCollector The address of the new fee collector.
    function setFeeCollector(address _newCollector) external;

    /**
     * @notice Retrieves a proposal by its ID.
     * @param _id The unique proposal ID.
     * @return The Proposal struct associated with the given ID.
     */
    function getProposalById(uint256 _id) external view returns (DataTypes.Proposal memory);

    /**
     * @notice Retrieves all donations for a given proposal ID.
     * @param _id The unique proposal ID.
     * @return An array of Donation structs associated with the proposal.
     */
    function getDonationsById(uint256 _id) external view returns (DataTypes.Donation[] memory);

    /**
     * @notice Retrieves all proposals submitted by a given proposer.
     * @param _proposer The address of the proposer.
     * @return An array of Proposal structs created by the proposer.
     */
    function getProposalsByProposer(address _proposer) external view returns (DataTypes.Proposal[] memory);

    /**
     * @notice Retrieves all proposals a donor has contributed to.
     * @param _donor The address of the donor.
     * @return An array of Proposal structs that the donor has funded.
     */
    function getFundedProposalsByDonor(address _donor) external view returns (DataTypes.Proposal[] memory);

    /**
     * @notice Checks if a given donor has contributed to a specific proposal.
     * @param _donor The donor’s address.
     * @param _id The proposal ID.
     * @return True if the donor has donated to the proposal, otherwise false.
     */
    function hasDonated(address _donor, uint256 _id) external view returns (bool);

    /**
     * @notice Retrieves all proposals submitted to the contract.
     * @return An array of all Proposal structs.
     */
    function getAllProposals() external view returns (DataTypes.Proposal[] memory);

    /**
     * @notice Retrieves the total number of proposals created.
     * @return The total count of proposals.
     */
    function getTotalProposals() external view returns (uint256);

    /**
     * @notice Returns the address of the fee collector.
     * @return The address of the current fee collector.
     */
    function getFeeCollector() external view returns (address);

    /**
     * @notice Returns the current fee balance accumulated in the contract.
     * @return The total fee balance stored in the contract.
     */
    function getFeeBalance() external view returns (uint256);
}
