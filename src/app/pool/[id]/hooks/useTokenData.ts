import { useQuery } from "@tanstack/react-query";

import { CACHE_TIME, REFRESH_TIME } from "@/api/constants";

import { RaydiumPriceData, TokenMetadata } from "./types";

/**
 * Получаем метаданные токена
 */
const fetchTokenMetadata = async (
  tokenAddress: string
): Promise<TokenMetadata> => {
  try {
    const response = await fetch(
      `/api/solana/token-metadata?address=${tokenAddress}`
    );
    return response.json();
  } catch (error) {
    throw new Error(`Failed to fetch token metadata: ${error}`);
  }
};

/**
 * Получаем актуальную цену базового токена в USDT
 */
const fetchRaydiumPrice = async (
  tokenAddress: string
): Promise<RaydiumPriceData> => {
  try {
    const response = await fetch(`/api/raydium/price?address=${tokenAddress}`);

    return response.json();
  } catch (error) {
    throw new Error(`Failed to fetch Raydium price data: ${error}`);
  }
};

export const useTokenData = (baseTokenAddress: string) => {
  const baseTokenQuery = useQuery({
    queryKey: ["token-metadata", baseTokenAddress],
    queryFn: () => fetchTokenMetadata(baseTokenAddress),
    enabled: !!baseTokenAddress,
    refetchInterval: CACHE_TIME,
    staleTime: REFRESH_TIME,
  });

  const baseTokenPriceQuery = useQuery({
    queryKey: ["raydium-price", baseTokenAddress],
    queryFn: () => fetchRaydiumPrice(baseTokenAddress),
    enabled: !!baseTokenAddress,
    staleTime: CACHE_TIME,
    refetchInterval: REFRESH_TIME,
  });

  return {
    baseToken: baseTokenQuery.data,
    baseTokenPrice: baseTokenPriceQuery.data,
    isLoading: baseTokenQuery.isLoading || baseTokenPriceQuery.isLoading,
    error: baseTokenQuery.error || baseTokenPriceQuery.error,
  };
};
