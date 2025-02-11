"use client";

import type { NextPage } from "next";
import Contributions from "~~/components/Contributions";
import Hero from "~~/components/Hero";
import Proposals from "~~/components/Proposals";

const Home: NextPage = () => {
  return (
    <main className="bg-white">
      <Hero />
      <Contributions />
      <Proposals />

      <div className="flex items-center gap-2 border border-black rounded-xl px-4 py-1 mb-4 justify-self-center">
        <img src="./icons/rocket.png" className="w-4 aspect-square" />
        <text className="text-sm">
          Big effort, <strong className="font-extrabold">Genova</strong>
        </text>
      </div>
    </main>
  );
};

export default Home;
