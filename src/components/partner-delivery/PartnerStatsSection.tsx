import React, { Suspense } from "react";
import Header from "./Header";
import TableSkeleton from "@/components/ui/TableSkeletion";
import PagePagination from "@/components/ui/PagePagination";
import PartnerDeliveryStatsTable from "./PartnerDeliveryStatsTable";
import { getPartnerDeliveryStats } from "@/app/admin/analytics/partner-delivery/_actions/action";

export default function PartnerStatsSection({
  searchParams,
}: {
  searchParams: { q: string; p: string; sorting: string };
}) {
  return (
    <section>
      {/* header */}
      <Header />

      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

const DataTable = async ({
  searchParams,
}: {
  searchParams: { q: string; p: string; sorting: string };
}) => {
  const limit = 20;

  let { data, connectionError, count } = await getPartnerDeliveryStats({
    searchParams: searchParams,
    limit: limit,
  });

  return (
    <section className="data-table-section my-6">
      <PartnerDeliveryStatsTable
        connectionError={connectionError}
        data={data as any[]}
      />
      <PagePagination count={Number(count[0]?.total || 0)} limit={limit} />
    </section>
  );
};
