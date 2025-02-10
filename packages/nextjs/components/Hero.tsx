import React from "react";
import ProfileImage from "./ProfileImage";
import ProposalForm from "./forms/ProposalForm";
import { PopoverContent, PopoverTrigger } from "~~/components/ui/popover";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section id="hero" className="flex min-h-[50vh] bg-gray-200">
      <div id="heroes" className="flex-1 h-[50vh] relative">
        <div className="w-12 aspect-square rounded-full absolute top-1/2 left-[10%]">
          <ProfileImage address="0x29d7c7E4571a83B3eF5C867f75c81D736a9D58aa" />
        </div>
        <div className="w-16 aspect-square rounded-full bg-gray-500 absolute top-[16%] left-[40%]"></div>
        <div className="w-16 aspect-square rounded-full absolute top-3/4 left-[40%]">
          <ProfileImage address="0x26e7Da1968cfC61FB8aB2Aad039b5A083b9De21e" />
        </div>
        <div id="tanto" className="w-24 aspect-square rounded-full absolute top-[42%] right-0">
          <ProfileImage address="0xA1EE4CC968a0328E9b1cF76f3Cd7d4dbE9A02A78" />
        </div>
      </div>

      <div className="flex-[1.5] flex flex-col h-[50vh] items-center gap-3 py-10 text-center">
        <div className="flex items-center gap-2 border border-black rounded-xl px-4 py-1 mb-4">
          <img src="./icons/rocket.png" className="w-4 aspect-square" />
          <text className="text-sm">Small effort, BIG change</text>
        </div>

        <h1 className="text-4xl font-bold max-w-[480px] leading-normal">Empower Change with Every Donation</h1>
        <text className="text-md leading-normal max-w-[480px]">
          Esse fugiat dolor anim ea ipsum do Lorem voluptate adipisicing laboris qui qui.
        </text>

        <PopoverTrigger>
          <button className="bg-gray-500 text-white hover:bg-white px-8 py-2 hover:text-gray-500 border hover:border-gray-500 rounded-3xl font-light duration-200 mt-4 text-sm">
            <text>I need support</text>
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <ProposalForm />
        </PopoverContent>
      </div>

      <div id="heroes" className="flex-1 h-[50vh] relative">
        <div className="w-12 aspect-square rounded-full absolute top-1/2">
          <ProfileImage address="0xb5dcad2a23c5de55e241f20602224d1921318008" />
        </div>
        <div className="w-16 aspect-square rounded-full absolute top-[16%] left-[30%]">
          <ProfileImage address="0xb5dcad2a23c5de55e241f20602224d1921318008" />
        </div>
        <div id="jordy" className="w-16 aspect-square rounded-full absolute top-3/4 left-[30%]">
          <ProfileImage address="0x378Be8577ede94b9d4b9F45447F21B826501bab8" />
        </div>
        <div id="feindura" className="w-24 aspect-square rounded-full absolute top-[42%] right-[10%]">
          <ProfileImage address="0xCDeC110F9c255357E37f46CD2687be1f7E9B02F7" />
        </div>
      </div>
    </section>
  );
}
