import SearchDa from "@/components/constants/SearchDa";
import ConveyanceTable from "@/components/conveyance/ConveyanceTable";
import PagePagination from "@/components/ui/PagePagination";
import React, { Suspense } from "react";
import { getConveyanceData } from "../../conveyance/_action/action";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { DataTable } from "../../conveyance/page";

export default function DaCoveyancePage({
  searchParams,
}: {
  searchParams: { q: string; start: string, p:string };
}) {
  return (
    <>
      {searchParams.q ? (
        <>
          <Suspense fallback={<TableSkeleton />}>
            <DataTable searchParams={searchParams} />
          </Suspense>
        </>
      ) : (
        <SearchDa />
      )}
    </>
  );
}
