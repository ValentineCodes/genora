import { useScaffoldReadContract } from "../scaffold-eth";

export function useProposals() {
  const { data, error, isLoading } = useScaffoldReadContract({
    contractName: "Genora",
    functionName: "getAllProposals",
  });

  return { proposals: data ?? [], error, isLoading };
}
