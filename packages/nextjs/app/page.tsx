"use client";

import type { NextPage } from "next";
import Contributions from "~~/components/Contributions";
import Donations from "~~/components/Donations";
import Hero from "~~/components/Hero";
import Proposals from "~~/components/Proposals";
import { PopoverRoot } from "~~/components/ui/popover";

const Home: NextPage = () => {
  return (
    <main className="bg-white">
      <PopoverRoot>
        <Hero />
        <Contributions />
        <Donations />
        <Proposals />

        <div className="flex items-center gap-2 border border-black rounded-xl px-4 py-1 mb-4 justify-self-center">
          <img src="./icons/rocket.png" className="w-4 aspect-square" />
          <text className="text-sm">
            Big effort, <strong className="font-extrabold">Genova</strong>
          </text>
        </div>
      </PopoverRoot>
    </main>
  );
};

export default Home;
