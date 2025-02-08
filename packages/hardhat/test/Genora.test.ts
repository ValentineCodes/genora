import { expect } from "chai";
import { ethers } from "hardhat";
import { Genora, Genora__factory } from "../typechain-types";
import { Signer } from "ethers";

describe("Genora", function () {
  let genora: Genora;
  let deployer: Signer, addr1: Signer, addr2: Signer, newCollector: Signer;
  let deployerAddress: string, addr1Address: string, addr2Address: string, newCollectorAddress: string;

  before(async () => {
    [deployer, addr1, addr2, newCollector] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    addr1Address = await addr1.getAddress();
    addr2Address = await addr2.getAddress();
    newCollectorAddress = await newCollector.getAddress();

    const GenoraFactory = (await ethers.getContractFactory("Genora")) as Genora__factory;
    genora = await GenoraFactory.deploy(deployerAddress); // Deploy with fee collector as deployer
    await genora.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy with an empty proposals list", async function () {
      expect(await genora.getTotalProposals()).to.equal(0);
    });

    it("Should set the correct initial fee collector", async function () {
      expect(await genora.getFeeCollector()).to.equal(deployerAddress);
    });

    it("Should start with zero fee balance", async function () {
      expect(await genora.getFeeBalance()).to.equal(0);
    });
  });

  describe("Proposals", function () {
    it("Should allow users to create proposals", async function () {
      await expect(
        genora.connect(addr1).propose({
          title: "Save the Rainforest",
          description: "Funding for tree planting",
          recipientAddress: addr2Address,
        }),
      ).to.emit(genora, "ProposalAdded");

      expect(await genora.getTotalProposals()).to.equal(1);
      const proposal = await genora.getProposalById(1);
      expect(proposal.title).to.equal("Save the Rainforest");
      expect(proposal.recipientAddress).to.equal(addr2Address);
    });

    it("Should revert if title or description is empty", async function () {
      await expect(
        genora.connect(addr1).propose({
          title: "",
          description: "Valid description",
          recipientAddress: addr2Address,
        }),
      ).to.be.revertedWithCustomError(genora, "Genora__EmptyTitle");

      await expect(
        genora.connect(addr1).propose({
          title: "Valid title",
          description: "",
          recipientAddress: addr2Address,
        }),
      ).to.be.revertedWithCustomError(genora, "Genora__EmptyDescription");
    });

    it("Should revert if recipient address is zero", async function () {
      await expect(
        genora.connect(addr1).propose({
          title: "Valid title",
          description: "Valid description",
          recipientAddress: ethers.ZeroAddress,
        }),
      ).to.be.revertedWithCustomError(genora, "Genora__ZeroAddress");
    });
  });

  describe("Donations & Fee Model", function () {
    it("Should allow users to donate and deduct 1% fee", async function () {
      const donationAmount = ethers.parseEther("1"); // 1 ETH donation
      const expectedFee = donationAmount / BigInt(100); // 1% fee

      await expect(genora.connect(addr1).donate(1, { value: donationAmount })).to.emit(genora, "Donated");

      const feeBalance = await genora.getFeeBalance();
      expect(feeBalance).to.equal(expectedFee);

      const donations = await genora.getDonationsById(1);
      expect(donations.length).to.equal(1);
      expect(donations[0].donor).to.equal(addr1Address);
      expect(donations[0].amount).to.equal(donationAmount);
    });

    it("Should revert if donating to a non-existent proposal", async function () {
      await expect(genora.connect(addr1).donate(999, { value: ethers.parseEther("1") })).to.be.revertedWithCustomError(
        genora,
        "Genora__InvalidProposal",
      );
    });

    it("Should revert if donation amount is zero", async function () {
      await expect(genora.connect(addr1).donate(1, { value: 0 })).to.be.revertedWithCustomError(
        genora,
        "Genora__ZeroValue",
      );
    });
  });

  describe("Fee Collection & Withdrawal", function () {
    it("Should allow the fee collector to withdraw fees", async function () {
      const feeCollectorBalanceBefore = await ethers.provider.getBalance(deployerAddress);
      const contractFeeBalance = await genora.getFeeBalance();

      await expect(genora.connect(deployer).withdrawFees())
        .to.emit(genora, "FeeWithdrawn")
        .withArgs(deployerAddress, contractFeeBalance);

      const feeCollectorBalanceAfter = await ethers.provider.getBalance(deployerAddress);
      expect(await genora.getFeeBalance()).to.equal(0);
      expect(feeCollectorBalanceAfter).to.be.above(feeCollectorBalanceBefore);
    });

    it("Should revert if a non-fee collector tries to withdraw fees", async function () {
      await expect(genora.connect(addr1).withdrawFees()).to.be.revertedWithCustomError(genora, "Genora__Unauthorized");
    });
  });

  describe("Fee Collector Management", function () {
    it("Should allow the fee collector to update the fee collector address", async function () {
      await expect(genora.connect(deployer).setFeeCollector(newCollectorAddress))
        .to.emit(genora, "FeeCollectorUpdated")
        .withArgs(deployerAddress, newCollectorAddress);

      expect(await genora.getFeeCollector()).to.equal(newCollectorAddress);
    });

    it("Should revert if a non-fee collector tries to update the fee collector", async function () {
      await expect(genora.connect(addr1).setFeeCollector(addr2Address)).to.be.revertedWithCustomError(
        genora,
        "Genora__Unauthorized",
      );
    });

    it("Should revert if setting fee collector to zero address", async function () {
      await expect(genora.connect(newCollector).setFeeCollector(ethers.ZeroAddress)).to.be.revertedWithCustomError(
        genora,
        "Genora__ZeroAddress",
      );
    });
  });

  describe("Getters", function () {
    it("Should return the correct fee collector address", async function () {
      expect(await genora.getFeeCollector()).to.equal(newCollectorAddress);
    });

    it("Should return the correct fee balance", async function () {
      expect(await genora.getFeeBalance()).to.equal(0);
    });
  });
});
