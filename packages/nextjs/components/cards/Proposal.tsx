import React from "react";
import ProfileImage from "../ProfileImage";
import ProposalDetails from "../ProposalDetails";
import { HStack } from "@chakra-ui/react";
import { RiHeartAdd2Line } from "react-icons/ri";
import { DialogContent, DialogRoot, DialogTrigger } from "~~/components/ui/dialog";
import { Proposal as ProposalType } from "~~/types/contract";
import { convertMarkdown, truncateWords } from "~~/utils/helpers";
import { parseTimestamp } from "~~/utils/scaffold-eth/parseTimestamp";

type Props = {
  proposal: ProposalType;
};

export default function Proposal({ proposal }: Props) {
  return (
    <div className="flex flex-col border border-black rounded-lg w-[250px] aspect-[3/2] relative">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <div className="flex flex-col flex-1 justify-center items-center text-center cursor-pointer">
            <h1 className="text-lg font-semibold max-w-[75%]">{proposal.title}</h1>
            <text
              className="text-xs max-w-[75%]"
              dangerouslySetInnerHTML={{ __html: convertMarkdown(truncateWords(proposal.description)) }}
            ></text>
          </div>
        </DialogTrigger>

        <DialogContent>
          <ProposalDetails proposal={proposal} />
        </DialogContent>
      </DialogRoot>

      <div className="p-2 flex justify-between items-center rounded-b-lg">
        <div>
          <text className="text-xs">{parseTimestamp(proposal.timestamp)}</text>
        </div>

        <HStack>
          <div className="w-5 aspect-square rounded-full">
            <ProfileImage address={proposal.proposer} />
          </div>
          <RiHeartAdd2Line className="text-2xl" />
        </HStack>
      </div>
    </div>
  );
}
