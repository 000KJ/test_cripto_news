import { RowData } from "../columns";

import { getHeader } from "./getHeader";
import { getFormatedValue } from "./getFormatedValue";
import { getSortedColumns } from "./getSortedColumns";

export const getAttributesCol = (attributes: object) => {
  const entries = Object.entries(attributes);

  const adaptedColumns = entries.map(([key]) => ({
    accessorKey: key,
    header: getHeader(key),
    cell: ({ row }: { row: RowData }) => {
      const cellValue =
        row.original.attributes[key as keyof typeof row.original.attributes];

      return getFormatedValue(key, cellValue);
    },
  }));

  return getSortedColumns(adaptedColumns);
};
