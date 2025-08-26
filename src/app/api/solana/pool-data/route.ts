import { NextResponse } from "next/server";

import { COINGECKO_API_KEY, COINGECKO_API_URL } from "@/api/constants";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${COINGECKO_API_URL}/onchain/networks/solana/pools/${address}`,
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
