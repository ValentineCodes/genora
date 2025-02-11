import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { LuHeartHandshake } from "react-icons/lu";
import { formatEther, parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { useDeployedContractInfo, useWatchBalance } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { Proposal } from "~~/types/contract";
import { truncateAddress } from "~~/utils/helpers";

type Props = {
  proposal: Proposal;
  onSuccess?: () => void;
};

export default function DonationForm({ proposal, onSuccess }: Props) {
  const [nativeValue, setNativeValue] = useState(""); // Always store value in LYX
  const [dollarValue, setDollarValue] = useState("");
  const [isDollar, setIsDollar] = useState(true); // Toggle USD/LYX
  const [isDonating, setIsDonating] = useState(false);

  const account = useAccount();
  const { data: balance } = useWatchBalance({ address: account.address });
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);

  const { data: genora } = useDeployedContractInfo("Genora");

  const { writeContractAsync } = useWriteContract();

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  const activeCurrencyStyle = { color: "purple", fontWeight: "bold" };
  const errorStyle = { color: "red" };

  // Handle input conversion & enforce numeric values
  const handleInput = (input: string) => {
    if (input.trim() === "") {
      setNativeValue("");
      setDollarValue("");
      return;
    }

    // Ensure only valid floating numbers are parsed
    const numericValue = input.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except `.`
    if (!/^\d*\.?\d*$/.test(numericValue) || numericValue == "") return; // Ensure valid decimal format

    if (isDollar) {
      setDollarValue(numericValue);
      setNativeValue((parseFloat(numericValue) / nativeCurrencyPrice).toString());
    } else {
      setNativeValue(numericValue);
      setDollarValue((parseFloat(numericValue) * nativeCurrencyPrice).toFixed(2));
    }
  };

  const displayValue = isDollar ? dollarValue : nativeValue;
  const displayConversion = isDollar ? nativeValue : dollarValue;
  const isBalanceInsufficient = Number(nativeValue) > formattedBalance;

  const donate = async () => {
    if (nativeValue == "") {
      alert("Please input a donation amount!");
      return;
    }

    if (isBalanceInsufficient) {
      alert("Insufficient funds!");
      return;
    }

    if (!genora) {
      alert("Loading resources...");
      return;
    }

    try {
      setIsDonating(true);

      await writeContractAsync({
        abi: genora.abi,
        address: genora.address,
        functionName: "donate",
        args: [1n],
        value: parseEther(nativeValue),
      });

      alert("Thanks for your support! 🤝");

      setNativeValue("");
      setDollarValue("");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to donate: ", error);
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{proposal.title}</h1>
          <strong className="text-xs mb-4 flex items-center gap-1">
            <span className="text-gray-500">→</span>
            <span className="font-semibold text-sm text-gray-500">{truncateAddress(proposal.recipientAddress)}</span>
          </strong>
        </div>

        <div className="flex flex-col font-bold text-gray-500">
          <span className="text-md">{formattedBalance.toFixed(2)} LYX</span>
          <span className="text-xs">${(formattedBalance * nativeCurrencyPrice).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center">
          {isDollar && <span className="text-4xl">$</span>}
          <Input
            placeholder="0"
            className="h-16 text-center text-4xl outline-none"
            value={displayValue}
            onChange={e => handleInput(e.target.value)}
            width={`${Math.max(displayValue.length, 1)}ch`}
          />
          {!isDollar && <span className="text-4xl">LYX</span>}
        </div>
        <strong className="text-md font-semibold italic text-gray-500" style={isBalanceInsufficient ? errorStyle : {}}>
          ~{!isDollar && "$"}
          {displayConversion} {isDollar && "LYX"}
        </strong>

        <button
          className="border border-black px-2 py-1 text-sm mt-2 rounded-md"
          onClick={() => setIsDollar(prev => !prev)}
        >
          <span style={isDollar ? activeCurrencyStyle : {}}>USD</span> /{" "}
          <span style={!isDollar ? activeCurrencyStyle : {}}>LYX</span>
        </button>

        <LuHeartHandshake className="text-4xl text-red-300 cursor-pointer mt-10" onClick={donate} />
      </div>
    </div>
  );
}
