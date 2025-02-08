// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { IGenora } from "../interfaces/IGenora.sol";
import { DataTypes } from "./libraries/DataTypes.sol";

/**
 * @title Genora
 * @dev A contract that allows users to propose initiatives and receive donations.
 */
contract Genora is IGenora {
    // ==========================
    // Errors
    // ==========================
    error Genora__ZeroAddress();
    error Genora__ZeroValue();
    error Genora__EmptyTitle();
    error Genora__EmptyDescription();

    // ==========================
    // State Variables
    // ==========================

    /// @dev Mapping of proposal ID to its corresponding Proposal data
    mapping(uint256 => DataTypes.Proposal) private s_proposalById;

    /// @dev Mapping of proposal ID to an array of donations received
    mapping(uint256 => DataTypes.Donation[]) private s_donations;

    /// @dev Mapping of proposer address to their submitted proposals
    mapping(address => DataTypes.Proposal[]) private s_proposals;

    /// @dev Mapping of donor address to proposals they have funded
    mapping(address => DataTypes.Proposal[]) private s_fundedProposals;

    /// @dev Mapping to track whether a donor has contributed to a specific proposal
    mapping(address => mapping(uint256 => bool)) private s_hasDonated;

    /// @dev Array to store all proposals submitted
    DataTypes.Proposal[] private s_allProposals;

    /// @dev Counter for total proposals submitted
    uint256 private s_totalProposals;

    // ==========================
    // Functions
    // ==========================

    /**
     * @notice Creates a new proposal.
     * @dev Ensures the proposal has valid inputs before storing it.
     * @param _proposal Struct containing proposal details such as title, description, and recipient address.
     */
    function propose(DataTypes.ProposalParams calldata _proposal) external {
        require(bytes(_proposal.title).length != 0, Genora__EmptyTitle());
        require(bytes(_proposal.description).length != 0, Genora__EmptyDescription());
        require(_proposal.recipientAddress != address(0), Genora__ZeroAddress());

        uint256 proposalId = ++s_totalProposals;

        // Create a new proposal instance
        DataTypes.Proposal memory newProposal = DataTypes.Proposal({
            id: proposalId,
            title: _proposal.title,
            description: _proposal.description,
            proposer: msg.sender,
            recipientAddress: _proposal.recipientAddress,
            timestamp: block.timestamp
        });

        // Store proposal in mappings
        s_proposalById[proposalId] = newProposal;
        s_proposals[msg.sender].push(newProposal);
        s_allProposals.push(newProposal);

        // Emit event
        emit ProposalAdded(
            proposalId,
            _proposal.title,
            _proposal.description,
            msg.sender,
            _proposal.recipientAddress,
            block.timestamp
        );
    }
}
