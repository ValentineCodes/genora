import { expect } from "chai";
import { ethers } from "hardhat";
import { Genora, Genora__factory } from "../typechain-types";
import { Signer } from "ethers";

describe("Genora", function () {
  let genora: Genora;
  let addr1: Signer, addr2: Signer;
  let addr1Address: string, addr2Address: string;

  before(async () => {
    [addr1, addr2] = await ethers.getSigners();
    addr1Address = await addr1.getAddress();
    addr2Address = await addr2.getAddress();

    const GenoraFactory = (await ethers.getContractFactory("Genora")) as Genora__factory;
    genora = await GenoraFactory.deploy();
    await genora.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy with an empty proposals list", async function () {
      expect(await genora.getTotalProposals()).to.equal(0);
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

  describe("Donations", function () {
    it("Should allow users to donate to proposals", async function () {
      const donationAmount = ethers.parseEther("1");

      await expect(genora.connect(addr1).donate(1, { value: donationAmount })).to.emit(genora, "Donated");

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

  describe("Getter Functions", function () {
    it("Should return correct proposal by ID", async function () {
      const proposal = await genora.getProposalById(1);
      expect(proposal.title).to.equal("Save the Rainforest");
    });

    it("Should return all proposals", async function () {
      const allProposals = await genora.getAllProposals();
      expect(allProposals.length).to.equal(1);
    });

    it("Should return proposals by proposer", async function () {
      const proposals = await genora.getProposalsByProposer(addr1Address);
      expect(proposals.length).to.equal(1);
      expect(proposals[0].title).to.equal("Save the Rainforest");
    });

    it("Should return funded proposals by donor", async function () {
      const fundedProposals = await genora.getFundedProposalsByDonor(addr1Address);
      expect(fundedProposals.length).to.equal(1);
      expect(fundedProposals[0].title).to.equal("Save the Rainforest");
    });

    it("Should correctly track if a donor has donated", async function () {
      expect(await genora.hasDonated(addr1Address, 1)).to.be.true;
      expect(await genora.hasDonated(addr1Address, 999)).to.be.false;
    });
  });
});
