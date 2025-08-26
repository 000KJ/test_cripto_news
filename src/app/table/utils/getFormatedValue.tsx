import { headers } from "./constnants";

export const getFormatedValue = <K extends string, V = unknown>(
  key: K,
  value: V,
) => {
  if (!headers[key as keyof typeof headers]) return null;

  if (
    key === "price_change_percentage" &&
    typeof value === "object" &&
    value !== null
  ) {
    const priceChange = value as { h24?: string };
    return priceChange.h24
      ? `${parseFloat(priceChange.h24).toFixed(2)}%`
      : "N/A";
  }

  if (key === "volume_usd" && typeof value === "object" && value !== null) {
    const volume = value as { h24?: string };
    return volume.h24 ? `$${parseFloat(volume.h24).toLocaleString()}` : "N/A";
  }

  if (key === "transactions" && typeof value === "object" && value !== null) {
    const transactions = value as { h24?: { buys: number; sells: number } };
    if (transactions.h24) {
      return `${transactions.h24.buys + transactions.h24.sells} (${
        transactions.h24.buys
      }B/${transactions.h24.sells}S)`;
    }
    return "N/A";
  }

  if (key.includes("usd") && typeof value === "string") {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return `$${numValue.toLocaleString()}`;
    }
  }

  return value;
};
