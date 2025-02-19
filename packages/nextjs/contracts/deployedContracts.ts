/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    Genora: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_feeCollector",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "Genora__EmptyDescription",
          type: "error",
        },
        {
          inputs: [],
          name: "Genora__EmptyTitle",
          type: "error",
        },
        {
          inputs: [],
          name: "Genora__InvalidProposal",
          type: "error",
        },
        {
          inputs: [],
          name: "Genora__TransferFailed",
          type: "error",
        },
        {
          inputs: [],
          name: "Genora__Unauthorized",
          type: "error",
        },
        {
          inputs: [],
          name: "Genora__ZeroAddress",
          type: "error",
        },
        {
          inputs: [],
          name: "Genora__ZeroValue",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "Donated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "oldCollector",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newCollector",
              type: "address",
            },
          ],
          name: "FeeCollectorUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "collector",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "FeeWithdrawn",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              indexed: true,
              internalType: "address",
              name: "proposer",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "recipientAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "ProposalAdded",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllProposals",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "recipientAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct DataTypes.Proposal[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "getDonationsById",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "donor",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct DataTypes.Donation[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getFeeBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getFeeCollector",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_donor",
              type: "address",
            },
          ],
          name: "getFundedProposalsByDonor",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "recipientAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct DataTypes.Proposal[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "getProposalById",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "recipientAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct DataTypes.Proposal",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_proposer",
              type: "address",
            },
          ],
          name: "getProposalsByProposer",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "proposer",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "recipientAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct DataTypes.Proposal[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getTotalProposals",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_donor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
          ],
          name: "hasDonated",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "recipientAddress",
                  type: "address",
                },
              ],
              internalType: "struct DataTypes.ProposalParams",
              name: "_proposal",
              type: "tuple",
            },
          ],
          name: "propose",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_newCollector",
              type: "address",
            },
          ],
          name: "setFeeCollector",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawFees",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        donate: "contracts/interfaces/IGenora.sol",
        getAllProposals: "contracts/interfaces/IGenora.sol",
        getDonationsById: "contracts/interfaces/IGenora.sol",
        getFeeBalance: "contracts/interfaces/IGenora.sol",
        getFeeCollector: "contracts/interfaces/IGenora.sol",
        getFundedProposalsByDonor: "contracts/interfaces/IGenora.sol",
        getProposalById: "contracts/interfaces/IGenora.sol",
        getProposalsByProposer: "contracts/interfaces/IGenora.sol",
        getTotalProposals: "contracts/interfaces/IGenora.sol",
        hasDonated: "contracts/interfaces/IGenora.sol",
        propose: "contracts/interfaces/IGenora.sol",
        setFeeCollector: "contracts/interfaces/IGenora.sol",
        withdrawFees: "contracts/interfaces/IGenora.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
