"use client";

import type { NextPage } from "next";
import Contributions from "~~/components/Contributions";
import Hero from "~~/components/Hero";

const Home: NextPage = () => {
  return (
    <main className="bg-white">
      <Hero />
      <Contributions />
    </main>
  );
};

export default Home;
