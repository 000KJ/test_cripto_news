"use client";

import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

import { useSolanaPools } from "./hooks/useSolanaPools";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";

export default function DemoPage() {
  const { data, isLoading, error } = useSolanaPools();

  if (isLoading) {
    // TODO: добавить skeleton таблицы
    return (
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="space-y-4 flex flex-col gap-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.data.length || error) {
    return (
      <Alert variant="destructive" className="text-red-800 border-red-800">
        <AlertCircleIcon />
        <AlertTitle>Something was wrong</AlertTitle>
      </Alert>
    );
  }

  const columns = getColumns(data.data);

  return <DataTable columns={columns} data={data.data} />;
}
