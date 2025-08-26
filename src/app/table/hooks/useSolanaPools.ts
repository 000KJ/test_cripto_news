import { useQuery } from "@tanstack/react-query";

import { CACHE_TIME, REFRESH_TIME } from "@api/constants";

import { SolanaPool } from "./types";

const fetchSolanaPools = async (): Promise<{ data: SolanaPool[] }> => {
  try {
    const res = await fetch(`/api/solana/pools`);

    return res.json();
  } catch (error) {
    throw new Error(`Failed to fetch Solana pools: ${error}`);
  }
};

export const useSolanaPools = () => {
  return useQuery<{ data: SolanaPool[] }>({
    queryKey: ["solana-pools"],
    queryFn: fetchSolanaPools,
    staleTime: CACHE_TIME,
    refetchInterval: REFRESH_TIME,
  });
};
