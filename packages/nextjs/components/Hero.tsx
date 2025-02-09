import React from "react";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section id="hero" className="flex min-h-[50vh] bg-gray-200">
      <div id="heroes" className="flex-1 h-[50vh] relative">
        <div className="w-12 aspect-square border border-black rounded-full absolute top-1/2 left-[10%]"></div>
        <div className="w-16 aspect-square border border-black rounded-full absolute top-[16%] left-[40%]"></div>
        <div className="w-16 aspect-square border border-black rounded-full absolute top-3/4 left-[40%]"></div>
        <div className="w-24 aspect-square border border-black rounded-full absolute top-[42%] right-0"></div>
      </div>

      <div className="flex-[1.5] flex flex-col h-[50vh] items-center gap-3 py-10 text-center">
        <div className="flex items-center gap-2 border border-black rounded-xl px-4 py-1 mb-4">
          <img src="./icons/rocket.png" className="w-4 aspect-square" />
          <strong className="text-sm">Small effort, BIG change</strong>
        </div>

        <h1 className="text-4xl font-bold max-w-[480px] leading-normal">Empower Change with Every Donation</h1>
        <text className="text-md leading-normal max-w-[480px]">
          Esse fugiat dolor anim ea ipsum do Lorem voluptate adipisicing laboris qui qui.
        </text>

        <button className="bg-gray-500 text-white hover:bg-white px-8 py-2 hover:text-gray-500 border hover:border-gray-500 rounded-3xl font-light duration-200 mt-4 text-sm">
          <text>I need support</text>
        </button>
      </div>

      <div id="heroes" className="flex-1 h-[50vh] relative">
        <div className="w-12 aspect-square border border-black rounded-full absolute top-1/2"></div>
        <div className="w-16 aspect-square border border-black rounded-full absolute top-[16%] left-[30%]"></div>
        <div className="w-16 aspect-square border border-black rounded-full absolute top-3/4 left-[30%]"></div>
        <div className="w-24 aspect-square border border-black rounded-full absolute top-[42%] right-[10%]"></div>
      </div>
    </section>
  );
}
