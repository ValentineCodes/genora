import React, { useState } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { isAddress } from "viem";
import { useWriteContract } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

export default function ProposalForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "", recipient: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: genora } = useDeployedContractInfo("Genora");

  const { writeContractAsync } = useWriteContract();

  const isFormValid = () => {
    let newErrors = { title: "", description: "", recipient: "" };
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!isAddress(recipient)) newErrors.recipient = "Invalid Ethereum address";

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    if (!genora) {
      alert("Loading resources...");
      return;
    }

    const proposal = { title, description, recipientAddress: recipient };

    try {
      setIsSubmitting(true);

      await writeContractAsync({
        abi: genora.abi,
        address: genora.address,
        functionName: "propose",
        args: [proposal],
      });

      alert("Proposal submitted successfully! 🚀");

      setTitle("");
      setDescription("");
      setRecipient("");
    } catch (error) {
      console.error("Proposal submission: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">How can you contribute?</h1>

      <Input
        placeholder="Title"
        className="bg-gray-100 mb-2 pl-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      <Textarea
        placeholder="Description (Markdown supported)"
        className="bg-gray-100 mb-2 pl-2 pt-2"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

      <Input
        placeholder="Recipient address"
        className="bg-gray-100 mb-2 pl-2"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
      />
      {errors.recipient && <p className="text-red-500 text-sm">{errors.recipient}</p>}

      <Button
        type="submit"
        className="self-end bg-gray-500 text-white hover:bg-white px-8 py-2 hover:text-gray-500 border hover:border-gray-500 rounded-3xl font-light duration-200 mt-4 text-sm"
        disabled={!title || !description || !isAddress(recipient)}
        loading={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
