import React from "react";
import Proposal from "./cards/Proposal";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Proposal as ProposalType } from "~~/types/contract";

type Props = {};

export default function Contributions({}: Props) {
  const account = useAccount();
  const { data: proposals } = useScaffoldReadContract({
    contractName: "Genora",
    functionName: "getFundedProposalsByDonor",
    args: [account.address],
  });

  return (
    <section id="contributions" className="flex flex-col min-h-[50vh] max-w-[1200px] mx-auto py-12">
      <header>
        <h2 className="text-lg font-bold">Contributions</h2>
        <text className="text-sm">Ut enim voluptate culpa ipsum cupidatat nulla nisi quis ipsum duis est nulla.</text>
      </header>

      <div className="mt-8 flex gap-4">
        {proposals && proposals.length > 0 ? (
          proposals.map((proposal: ProposalType) => <Proposal key={proposal.id.toString()} proposal={proposal} />)
        ) : (
          <p className="text-2xl text-gray-400">You haven't made any contributions</p>
        )}
      </div>
    </section>
  );
}
