import { headers } from "./constnants";

/**
 * Сортируем хедеры таблицы по порядке который указан в константе headers
 */
export const getSortedColumns = <
  D extends string,
  V extends string,
  T = unknown
>(
  columns: { accessorKey: D; header: V; cell: T }[]
) =>
  columns.sort((a, b) => {
    const headerKeys = Object.keys(headers);
    const aIndex = headerKeys.indexOf(a.accessorKey);
    const bIndex = headerKeys.indexOf(b.accessorKey);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
