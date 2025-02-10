import React from "react";
import ProfileImage from "../ProfileImage";
import ProposalDetails from "../ProposalDetails";
import { HStack } from "@chakra-ui/react";
import { RiHeartAdd2Line } from "react-icons/ri";
import { DialogContent, DialogRoot, DialogTrigger } from "~~/components/ui/dialog";

type Props = {
  title: string;
  description: string;
  timestamp?: string | number | bigint;
  total?: number;
  hideFooter?: boolean;
};

export default function DonationCard({ title, description, timestamp, total, hideFooter }: Props) {
  return (
    <div className="flex flex-col border border-black rounded-lg w-[250px] aspect-[3/2] relative">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <div className="flex flex-col flex-1 justify-center items-center text-center cursor-pointer">
            <h1 className="text-lg font-semibold max-w-[75%]">{title}</h1>
            <text className="text-xs max-w-[75%]">{description}</text>
          </div>
        </DialogTrigger>

        <DialogContent>
          <ProposalDetails />
        </DialogContent>
      </DialogRoot>

      {hideFooter ? (
        <div className="w-5 aspect-square rounded-full absolute bottom-2 right-2">
          <ProfileImage address="0x29d7c7E4571a83B3eF5C867f75c81D736a9D58aa" />
        </div>
      ) : (
        <div className="p-2 flex justify-between items-center rounded-b-lg">
          <div>
            <text className="text-xs">Sept 4, 2025</text>
          </div>

          <HStack>
            <div className="w-5 aspect-square rounded-full">
              <ProfileImage address="0x29d7c7E4571a83B3eF5C867f75c81D736a9D58aa" />
            </div>
            <RiHeartAdd2Line className="text-2xl" />
          </HStack>
        </div>
      )}
    </div>
  );
}
