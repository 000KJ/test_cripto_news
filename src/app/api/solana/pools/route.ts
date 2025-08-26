import { NextResponse } from "next/server";

import { COINGECKO_API_KEY, COINGECKO_API_URL } from "@/api/constants";

export async function GET() {
  try {
    const res = await fetch(
      `${COINGECKO_API_URL}/onchain/networks/solana/trending_pools`,
      {
        headers: {
          Accept: "application/json",
          "x-cg-demo-api-key": COINGECKO_API_KEY,
        },
        cache: "no-store", // чтобы Next.js не кэшировал данные
      }
    );

    if (!res.ok) {
      throw new Error(`CoinGecko API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch data from CoinGecko" },
      { status: 500 }
    );
  }
}
