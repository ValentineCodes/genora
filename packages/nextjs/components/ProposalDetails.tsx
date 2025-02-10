import React from "react";
import ProfileImage from "./ProfileImage";
import { HStack } from "@chakra-ui/react";
import { RiHeartAdd2Line } from "react-icons/ri";
import Showdown from "showdown";
import { Proposal as ProposalType } from "~~/types/contract";
import { parseTimestamp } from "~~/utils/scaffold-eth/parseTimestamp";

type Props = {
  proposal: ProposalType;
};

const converter = new Showdown.Converter();

export default function ProposalDetails({ proposal }: Props) {
  return (
    <div className="p-4 flex flex-col max-h-[80vh]">
      <h1 className="text-2xl font-bold">{proposal.title}</h1>
      <text className="text-xs mb-4">{parseTimestamp(proposal.timestamp)}</text>
      <div
        className="overflow-auto flex-1"
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(proposal.description) }}
      ></div>

      <HStack className="self-end mt-4">
        <div className="w-10 aspect-square rounded-full">
          <ProfileImage address={proposal.proposer} />
        </div>
        <RiHeartAdd2Line className="text-4xl ml-2" />
      </HStack>
    </div>
  );
}
