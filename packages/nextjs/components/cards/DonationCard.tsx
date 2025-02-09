import React from "react";

type Props = {
  title: string;
  description: string;
  timestamp?: string | number | bigint;
  total?: number;
  hideFooter?: boolean;
};

export default function DonationCard({ title, description, timestamp, total, hideFooter }: Props) {
  return (
    <div className="flex flex-col border border-black rounded-lg w-[250px] aspect-[3/2]">
      <div className="flex flex-col flex-1 justify-center items-center text-center">
        <h1 className="text-lg font-semibold max-w-[75%]">{title}</h1>
        <text className="text-xs max-w-[75%]">{description}</text>
      </div>

      {!hideFooter && (
        <div className="bg-gray-200 px-4 py-2 flex justify-between items-center rounded-b-lg">
          <div>
            <text className="text-xs">Sept 4, 2025</text>
          </div>

          <button className="bg-gray-500 text-white hover:bg-white px-4 py-1 hover:text-gray-500 border hover:border-gray-500 rounded-3xl font-light duration-200 text-xs">
            <text>Support</text>
          </button>
        </div>
      )}
    </div>
  );
}
