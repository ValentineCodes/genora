import React from "react";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section id="hero" className="flex min-h-screen">
      <div className="flex-1 h-screen"></div>
      <div className="flex-[2] flex flex-col h-screen items-center gap-4 py-10 text-center">
        <div className="flex items-center gap-2 border border-black rounded-xl px-4 py-1 mb-4">
          <img src="./icons/rocket.png" className="w-4 h-4 " />
          <text className="text-sm">Small effort, BIG change</text>
        </div>

        <text className="text-4xl font-bold max-w-[480px] leading-normal">Empower Change with Every Donation</text>
        <text className="text-md leading-normal max-w-[480px]">
          Esse fugiat dolor anim ea ipsum do Lorem voluptate adipisicing laboris qui qui.
        </text>

        <button className="bg-gray-500 text-white hover:bg-white px-4 py-2 hover:text-gray-500 border hover:border-gray-500 rounded-3xl font-light duration-200 mt-4 text-sm">
          <text>Do you need support?</text>
        </button>
      </div>
      <div className="flex-1 h-screen"></div>
    </section>
  );
}
