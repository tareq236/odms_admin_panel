import SearchDa from "@/components/constants/SearchDa";
import CardSection from "@/components/delivery/collection/CardSection";
import React, { Suspense } from "react";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { DataTable } from "../../delivery/collection/page";

export default function DaDeliveryPage({
  searchParams,
}: {
  searchParams: {
    q: string;
    start: string;
    p: string;
    dId: string;
    status: string;
  };
}) {
  if (!searchParams.q) return <SearchDa />;

  return (
    <>
      <Suspense>
        <CardSection searchParams={searchParams} />
      </Suspense>

      {/* table section */}
      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}
