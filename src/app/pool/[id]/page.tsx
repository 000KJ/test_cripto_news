"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Breadcrumbs } from "../../breadcrumbs";
import { TokenInfo } from "./components/TokenInfo";
import { usePoolData, useTokenData } from "./hooks";

export default function PoolDetailPage() {
  const params = useParams();
  const router = useRouter();

  const poolId = params.id as string;

  const { data, isLoading, error } = usePoolData(poolId);

  const pool = data?.data;

  const baseTokenAddress = pool?.relationships?.base_token?.data?.id.replace(
    "solana_",
    ""
  );

  const tokenData = useTokenData(baseTokenAddress || "");

  if (isLoading) {
    return (
      // TODO: добавить skeleton из ui
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pool) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Pool not found
          </h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const { attributes, relationships } = pool;

  return (
    <div className="container mx-auto py-10">
      <Breadcrumbs />

      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-3xl font-bold mb-2">{attributes.name}</h1>
        <p className="text-gray-600 mb-4">Pool ID: {pool.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Обновляемая ниформация о токене */}
        {baseTokenAddress && (
          <div>
            {tokenData.isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border shadow-sm animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ) : tokenData.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Failed to load token data
                </h3>
                <p className="text-red-600 mb-4">
                  Unable to fetch token metadata and price information. Please
                  try again later.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Retry
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TokenInfo
                  tokenAddress={baseTokenAddress}
                  tokenType="base"
                  metadata={tokenData.baseToken}
                  priceData={tokenData.baseTokenPrice}
                  isLoading={tokenData.isLoading}
                />
              </div>
            )}
          </div>
        )}

        {/* Price Information */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Price Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Token Price (USD):</span>
              <span className="font-medium">
                ${parseFloat(attributes.base_token_price_usd).toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quote Token Price (USD):</span>
              <span className="font-medium">
                ${parseFloat(attributes.quote_token_price_usd).toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base/Quote Ratio:</span>
              <span className="font-medium">
                {parseFloat(attributes.base_token_price_quote_token).toFixed(6)}
              </span>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Market Data</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">FDV (USD):</span>
              <span className="font-medium">
                ${parseFloat(attributes.fdv_usd).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Market Cap:</span>
              <span className="font-medium">
                {attributes.market_cap_usd
                  ? `$${parseFloat(attributes.market_cap_usd).toLocaleString()}`
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reserve (USD):</span>
              <span className="font-medium">
                ${parseFloat(attributes.reserve_in_usd).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Pool Details */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Pool Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-mono text-sm text-blue-600">
                {attributes.address.slice(0, 8)}...
                {attributes.address.slice(-6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">
                {new Date(attributes.pool_created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">DEX:</span>
              <span className="font-medium">{relationships.dex.data.id}</span>
            </div>
          </div>
        </div>

        {/* 24h Price Changes */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">24h Price Changes</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">1h:</span>
              <span
                className={`font-medium ${
                  parseFloat(attributes.price_change_percentage.h1) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {parseFloat(attributes.price_change_percentage.h1).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">6h:</span>
              <span
                className={`font-medium ${
                  parseFloat(attributes.price_change_percentage.h6) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {parseFloat(attributes.price_change_percentage.h6).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">24h:</span>
              <span
                className={`font-medium ${
                  parseFloat(attributes.price_change_percentage.h24) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {parseFloat(attributes.price_change_percentage.h24).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Volume Information */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Volume (USD)</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">1h:</span>
              <span className="font-medium">
                ${parseFloat(attributes.volume_usd.h1).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">6h:</span>
              <span className="font-medium">
                ${parseFloat(attributes.volume_usd.h6).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">24h:</span>
              <span className="font-medium">
                ${parseFloat(attributes.volume_usd.h24).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Token Information */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Token Information</h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="w-full text-gray-600">Base Token:</span>
              <Tooltip>
                <TooltipTrigger className="w-full cursor-pointer">
                  {relationships.base_token.data.id.slice(0, 8)}...
                  {relationships.base_token.data.id.slice(-6)}
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  <p>{relationships.base_token.data.id}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex">
              <span className="w-full text-gray-600">Quote Token:</span>
              <Tooltip>
                <TooltipTrigger className="w-full cursor-pointer">
                  {relationships.quote_token.data.id.slice(0, 8)}...
                  {relationships.quote_token.data.id.slice(-6)}
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  <p>{relationships.quote_token.data.id}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{pool.type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">External Links</h2>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <a
              href={`https://solscan.io/account/${attributes.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Solscan
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
