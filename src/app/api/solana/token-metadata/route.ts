import { NextResponse } from "next/server";
import { Connection, PublicKey, PublicKeyInitData } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

import { HELIUS_API_KEY, HELIUS_RPC_URL } from "@/api/constants";

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

    const connection = new Connection(`${HELIUS_RPC_URL}/?api-key=${HELIUS_API_KEY}`);
    const metaplex = new Metaplex(connection);

    const publicKey = new PublicKey(tokenAddress as PublicKeyInitData);

    // 1. Получаем supply
    const supplyInfo = await connection.getTokenSupply(publicKey);

    // 2. Нормализуем supply через decimals
    const supply =
      Number(supplyInfo.value.amount) / 10 ** supplyInfo.value.decimals;

    // 2. Получаем metadata (через Metaplex)
    const nft = await metaplex.nfts().findByMint({ mintAddress: publicKey });

    return NextResponse.json({
      supply,
      name: nft.name,
      symbol: nft.symbol,
      image: nft.json?.image ?? null,
      description: nft.json?.description ?? null,
    });
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch token metadata" },
      { status: 500 }
    );
  }
}
