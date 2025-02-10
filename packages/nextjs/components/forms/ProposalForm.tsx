import React from "react";
import { Button, Input } from "@chakra-ui/react";

type Props = {};

export default function ProposalForm({}: Props) {
  return (
    <div className="p-4 flex flex-col">
      <Input placeholder="Title" className="bg-gray-100 mb-3 pl-2" required />
      <Input placeholder="Description(Markdown supported)" className="bg-gray-100 mb-3 pl-2" />
      <Input placeholder="Recipient address" className="bg-gray-100 pl-2" required />

      <Button className="self-end bg-gray-500 text-white hover:bg-white px-8 py-2 hover:text-gray-500 border hover:border-gray-500 rounded-3xl font-light duration-200 mt-4 text-sm">
        Submit
      </Button>
    </div>
  );
}
