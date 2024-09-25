import ConveyanceTable from "@/components/conveyance/ConveyanceTable";
import FilterSection from "@/components/conveyance/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Waypoints } from "lucide-react";
import React, { Suspense } from "react";
import { getConveyanceData } from "./_action/action";
import { rdl_conveyance } from "@prisma/client";
import RouteMap from "@/components/google-map/RouteMap";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import CardSection from "@/components/delivery/collection/CardSection";

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

      {searchParams.q != null && (
        <>
          <Suspense>
            <DaInfoSection searchParams={searchParams} />
          </Suspense>
        </>
      )}

      <Suspense>
        <h3 className="text-muted-foreground mt-3">Conveyance Table</h3>
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
  let limit = 20;
  const { data, count, connectionError } = await getConveyanceData({
    searchParams: searchParams,
    limit: limit,
  });

  console.log(data);
  return (
    <div className="data-table-section">
      <ConveyanceTable
        data={data as any[]}
        connectionError={connectionError}
      />
      <PagePagination limit={limit} count={count} />
    </div>
  );
};
