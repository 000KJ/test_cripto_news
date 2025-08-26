"use client";
import { Breadcrumbs } from "./breadcrumbs";
import DemoPage from "./table/table";

export default function Page() {
  const Table = DemoPage;

  return (
    <div className="container mx-auto py-10">
      <Breadcrumbs />
      <Table />
    </div>
  );
}
