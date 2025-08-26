export interface PriceChangePercentage {
  m5: string;
  m15: string;
  m30: string;
  h1: string;
  h6: string;
  h24: string;
}

export interface TransactionStats {
  buys: number;
  sells: number;
  buyers: number;
  sellers: number;
}

export interface Transactions {
  m5: TransactionStats;
  m15: TransactionStats;
  m30: TransactionStats;
  h1: TransactionStats;
  h6: TransactionStats;
  h24: TransactionStats;
}

export interface VolumeUSD {
  m5: string;
  m15: string;
  m30: string;
  h1: string;
  h6: string;
  h24: string;
}

export interface PoolAttributes {
  base_token_price_usd: string;
  base_token_price_native_currency: string;
  quote_token_price_usd: string;
  quote_token_price_native_currency: string;
  base_token_price_quote_token: string;
  quote_token_price_base_token: string;
  address: string;
  name: string;
  pool_created_at: string;
  fdv_usd: string;
  market_cap_usd: string | null;
  price_change_percentage: PriceChangePercentage;
  transactions: Transactions;
  volume_usd: VolumeUSD;
  reserve_in_usd: string;
}

export interface RelationshipData {
  id: string;
  type: string;
}

export interface Relationships {
  base_token: {
    data: RelationshipData;
  };
  quote_token: {
    data: RelationshipData;
  };
  dex: {
    data: RelationshipData;
  };
}

export interface SolanaPool {
  id: string;
  type: string;
  attributes: PoolAttributes;
  relationships: Relationships;
}

// Для удобства отображения в таблице
export interface PoolTableRow {
  id: string;
  name: string;
  address: string;
  baseTokenPriceUSD: number;
  quoteTokenPriceUSD: number;
  priceChange24h: number;
  volume24h: number;
  fdvUSD: number;
  reserveUSD: number;
  poolCreatedAt: string;
  dex: string;
  baseToken: string;
  quoteToken: string;
}
