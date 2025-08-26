"use client";

import { SolanaPool } from "./hooks/types";
import { getAttributesCol } from "./utils";

export interface RowData {
  original: SolanaPool;
}

export const getColumns = (data: SolanaPool[]) => {
  if (!data.length) return [];

  const firstPool = data[0];

  return getAttributesCol(firstPool?.attributes);
};
