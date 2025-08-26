import { ExternalLink, RefreshCw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RaydiumPriceData, TokenMetadata } from "../hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TokenInfoProps {
  tokenAddress: string;
  tokenType: "base" | "quote";
  metadata?: TokenMetadata;
  priceData?: RaydiumPriceData;
  isLoading: boolean;
}

export const TokenInfo = ({
  tokenAddress,
  tokenType,
  metadata,
  priceData,
  isLoading,
}: TokenInfoProps) => {
  const formatSupply = (supply: number | undefined) => {
    if (!supply) return "N/A";
    const amount = parseFloat(supply.toString());
    if (amount >= 1e9) {
      return `${(amount / 1e9).toFixed(2)}B`;
    } else if (amount >= 1e6) {
      return `${(amount / 1e6).toFixed(2)}M`;
    } else if (amount >= 1e3) {
      return `${(amount / 1e3).toFixed(2)}K`;
    }
    return amount.toFixed(2);
  };

  const formatPrice = (price?: number | null) => {
    if (!price) return "N/A";
    if (price < 0.000001) return `$${price.toExponential(4)}`;
    if (price < 0.01) return `$${price}`;
    if (price < 1) return `$${price}`;
    return `$${price}`;
  };

  const formatMarketCap = (marketCap: number | null) => {
    if (marketCap === null) return "N/A";
    if (marketCap >= 1e9) {
      return `$${marketCap / 1e9}B`;
    } else if (marketCap >= 1e6) {
      return `$${marketCap / 1e6}M`;
    } else if (marketCap >= 1e3) {
      return `$${marketCap / 1e3}K`;
    }
    return `$${marketCap}`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg capitalize">
            {tokenType} Token Information
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isLoading ? "secondary" : "default"}>
              {isLoading ? (
                <RefreshCw className="h-3 w-3 animate-spin mr-1" />
              ) : (
                "Live"
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Avatar className="bg-gray-100">
            <AvatarImage src={metadata?.image ?? ""} alt="@shadcn" />
            <AvatarFallback>{metadata?.symbol}</AvatarFallback>
          </Avatar>
          <label className="text-sm font-medium text-gray-600">Address</label>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              {tokenAddress.slice(0, 8)}...{tokenAddress.slice(-6)}
            </code>
            <a
              href={`https://solscan.io/token/${tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Total Supply
          </label>
          <div className="text-lg font-semibold">
            {formatSupply(metadata?.supply)}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Current Price
          </label>
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(priceData?.price)}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Market Cap
          </label>
          <div className="text-lg font-semibold">
            {priceData?.price || metadata?.supply
              ? formatMarketCap(
                  metadata?.supply
                    ? metadata?.supply * (priceData?.price || 0)
                    : 0
                )
              : null}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <div className="text-sm italic text-gray-600">
            {metadata?.description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
