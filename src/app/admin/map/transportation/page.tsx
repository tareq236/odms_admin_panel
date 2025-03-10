import ConveyanceTable from "@/components/conveyance/ConveyanceTable";
import FilterSection from "@/components/conveyance/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Waypoints } from "lucide-react";
import React, { Suspense } from "react";
import { getConveyanceData } from "./_action/action";
import type { Metadata } from "next";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";

export const metadata: Metadata = {
  title: "Transportations - ODMS Admin Panel",
};

export default async function TransportationsPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  return (
    <>
      <PageHeader
        title="Transportation"
        icon={<Waypoints className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection searchParams={searchParams} />
      </Suspense>

      {searchParams.q && (
        <Suspense>
          <DaInfoSection searchParams={searchParams} />
        </Suspense>
      )}

      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export const DataTable = async ({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) => {
  let limit = 20;
  const { data, count, connectionError } = await getConveyanceData({
    searchParams: searchParams,
    limit: limit,
  });

  return (
    <div className="flex flex-col gap-2">
      <ConveyanceTable data={data as any[]} connectionError={connectionError} />
      {/* <PagePagination limit={limit} count={count} /> */}
    </div>
  );
};
