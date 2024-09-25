import ConveyanceTable from "@/components/conveyance/ConveyanceTable";
import FilterSection from "@/components/conveyance/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Waypoints } from "lucide-react";
import React, { Suspense } from "react";
import { getConveyanceData } from "./_action/action";
import { rdl_conveyance } from "@prisma/client";

export default async function ConveyancePage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  return (
    <>
      <PageHeader
        title="Conveyance"
        icon={<Waypoints className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const DataTable = async ({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) => {

  let limit = 20
  const {data, count, connectionError} = await getConveyanceData({searchParams: searchParams, limit:limit})

  console.log(data)
  return (
    <div className="data-table-section">
      <ConveyanceTable data={data as rdl_conveyance[]} connectionError={connectionError} />
      <PagePagination limit={limit} count={count} />
    </div>
  );
};
