import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import DonationForm from "./forms/DonationForm";
import { HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { RiHeartAdd2Line } from "react-icons/ri";
import { Proposal as ProposalType } from "~~/types/contract";
import { convertMarkdown } from "~~/utils/helpers";
import { parseTimestamp } from "~~/utils/scaffold-eth/parseTimestamp";

type Props = {
  proposal: ProposalType;
};

export default function ProposalDetails({ proposal }: Props) {
  const [showDonationForm, setShowDonationForm] = useState(false);

  return (
    <div className="p-4 flex flex-col max-h-[80vh] relative">
      <h1 className="text-2xl font-bold">{proposal.title}</h1>
      <text className="text-xs mb-4">{parseTimestamp(proposal.timestamp)}</text>
      <div
        className="overflow-auto flex-1"
        dangerouslySetInnerHTML={{ __html: convertMarkdown(proposal.description) }}
      ></div>

      <HStack className="self-end mt-4">
        <div className="w-10 aspect-square rounded-full">
          <ProfileImage address={proposal.proposer} />
        </div>

        <RiHeartAdd2Line className="text-4xl ml-2 cursor-pointer" onClick={() => setShowDonationForm(true)} />

        {showDonationForm && (
          <motion.div
            initial={{ opacity: 0, backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ opacity: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center"
          >
            <div className="w-[70%]">
              <DonationForm proposal={proposal} onSuccess={() => setShowDonationForm(false)} />
            </div>

            <IoCloseOutline
              className="text-4xl text-white mt-4 cursor-pointer"
              onClick={() => setShowDonationForm(false)}
            />
          </motion.div>
        )}
      </HStack>
    </div>
  );
}
