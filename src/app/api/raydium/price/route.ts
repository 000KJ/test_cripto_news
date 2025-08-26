import { NextResponse } from "next/server";

import { RAYDIUM_API_URL } from "@/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenAddress = searchParams.get("address");

    if (!tokenAddress) {
      return NextResponse.json(
        { error: "Token address is required" },
        { status: 400 }
      );
    }

    const priceResponse = await fetch(
      `${RAYDIUM_API_URL}/mint/price?mints=${tokenAddress}`
    );

    if (!priceResponse.ok) {
      throw new Error(`Raydium API error: ${priceResponse.status}`);
    }

    const { data } = await priceResponse.json();

    const price = data[tokenAddress];

    return NextResponse.json({
      price: price,
    });
  } catch (error) {
    console.error("Error fetching Raydium price data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Raydium price data" },
      { status: 500 }
    );
  }
}
