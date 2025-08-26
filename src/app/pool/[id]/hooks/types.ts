export interface TokenMetadata {
  supply: number;
  name: string;
  symbol: string;
  image: string | null;
  description: string | null;
}

export interface RaydiumPriceData {
  price: number | null;
}