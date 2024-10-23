import SearchDa from "@/components/constants/SearchDa";
import React, { Suspense } from "react";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { DataTable } from "../../map/conveyance/page";

export default function DaCoveyancePage({
  searchParams,
}: {
  searchParams: { q: string; start: string; p: string };
}) {
  if (!searchParams.q) return <SearchDa />;

  return (
      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
  );
}
