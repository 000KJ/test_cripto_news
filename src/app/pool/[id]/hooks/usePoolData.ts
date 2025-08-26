import { useQuery } from "@tanstack/react-query";

import { SolanaPool } from "@/app/table/hooks/types";
import { CACHE_TIME, REFRESH_TIME } from "@api/constants";

const fetchPoolData = async (
  address: string
): Promise<{ data: SolanaPool }> => {
  try {
    const res = await fetch(`/api/solana/pool-data?address=${address}`);

    return res.json();
  } catch (error) {
    throw new Error(`Failed to fetch pool data: ${error}`);
  }
};

export const usePoolData = (address: string) => {
  return useQuery<{ data: SolanaPool }>({
    queryKey: ["solana-pool-data", address],
    queryFn: () => fetchPoolData(address),
    staleTime: CACHE_TIME,
    refetchInterval: REFRESH_TIME,
  });
};
