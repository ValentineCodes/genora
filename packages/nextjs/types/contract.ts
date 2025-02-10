/**
 * @dev Type representing a proposal.
 */
export type Proposal = {
  id: bigint; // uint256
  title: string;
  description: string;
  proposer: `0x${string}`; // address
  recipientAddress: `0x${string}`; // address
  timestamp: bigint; // uint256
};

/**
 * @dev Type representing input parameters for creating a proposal.
 */
export type ProposalParams = {
  title: string;
  description: string;
  recipientAddress: `0x${string}`; // address
};

/**
 * @dev Type representing a donation made to a proposal.
 */
export type Donation = {
  donor: `0x${string}`; // address
  amount: bigint; // uint256
  timestamp: bigint; // uint256
};
