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
    error Genora__InvalidProposal();
    error Genora__TransferFailed();
    error Genora__Unauthorized();

    // ==========================
    // State Variables
    // ==========================

    address private s_feeCollector; // Address of the fee collector
    uint256 private s_feeBalance; // Accumulated fees in the contract

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
    // Constructor
    // ==========================
    constructor(address _feeCollector) {
        require(_feeCollector != address(0), Genora__ZeroAddress());
        s_feeCollector = _feeCollector;
    }

    // ==========================
    // Functions
    // ==========================

    /// @inheritdoc IGenora
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

    /// @inheritdoc IGenora
    function donate(uint256 _id) external payable {
        DataTypes.Proposal memory proposal = s_proposalById[_id];

        require(proposal.id != 0, Genora__InvalidProposal());
        require(msg.value > 0, Genora__ZeroValue());

        uint256 fee = msg.value / 100; // 1% fee
        uint256 recipientAmount = msg.value - fee;

        s_feeBalance += fee; // Store collected fees

        // Transfer the donation (99%) to the recipient
        (bool success, ) = proposal.recipientAddress.call{ value: recipientAmount }("");
        require(success, Genora__TransferFailed());

        // Record the donation
        s_donations[_id].push(DataTypes.Donation({ donor: msg.sender, amount: msg.value, timestamp: block.timestamp }));

        // Track donor's funded proposals if it's their first donation to this proposal
        if (!s_hasDonated[msg.sender][_id]) {
            s_fundedProposals[msg.sender].push(proposal);
            s_hasDonated[msg.sender][_id] = true;
        }

        // Emit the donation event
        emit Donated(_id, msg.sender, msg.value, block.timestamp);
    }

    /// @inheritdoc IGenora
    function withdrawFees() external {
        require(msg.sender == s_feeCollector, Genora__Unauthorized());
        uint256 amount = s_feeBalance;
        s_feeBalance = 0;

        (bool success, ) = s_feeCollector.call{ value: amount }("");
        require(success, Genora__TransferFailed());

        emit FeeWithdrawn(s_feeCollector, amount);
    }

    /// @inheritdoc IGenora
    function setFeeCollector(address _newCollector) external {
        require(msg.sender == s_feeCollector, Genora__Unauthorized());
        require(_newCollector != address(0), Genora__ZeroAddress());

        emit FeeCollectorUpdated(s_feeCollector, _newCollector);
        s_feeCollector = _newCollector;
    }

    // ==========================
    // Getters
    // ==========================

    /// @inheritdoc IGenora
    function getProposalById(uint256 _id) external view returns (DataTypes.Proposal memory) {
        return s_proposalById[_id];
    }

    /// @inheritdoc IGenora
    function getDonationsById(uint256 _id) external view returns (DataTypes.Donation[] memory) {
        return s_donations[_id];
    }

    /// @inheritdoc IGenora
    function getProposalsByProposer(address _proposer) external view returns (DataTypes.Proposal[] memory) {
        return s_proposals[_proposer];
    }

    /// @inheritdoc IGenora
    function getFundedProposalsByDonor(address _donor) external view returns (DataTypes.Proposal[] memory) {
        return s_fundedProposals[_donor];
    }

    /// @inheritdoc IGenora
    function hasDonated(address _donor, uint256 _id) external view returns (bool) {
        return s_hasDonated[_donor][_id];
    }

    /// @inheritdoc IGenora
    function getAllProposals() external view returns (DataTypes.Proposal[] memory) {
        return s_allProposals;
    }

    /// @inheritdoc IGenora
    function getTotalProposals() external view returns (uint256) {
        return s_totalProposals;
    }

    /// @inheritdoc IGenora
    function getFeeCollector() external view returns (address) {
        return s_feeCollector;
    }

    /// @inheritdoc IGenora
    function getFeeBalance() external view returns (uint256) {
        return s_feeBalance;
    }
}
