import CardSection from "@/components/delivery/collection/CardSection";
import DeliveryCollectionTable from "@/components/delivery/collection/DeliveryCollectionTable";
import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { PackageCheck } from "lucide-react";
import React, { Suspense } from "react";

export default function DeliveryCollectionPage({
    searchParams,
  }: {
    searchParams: { p: string; q: string; start: string };
  }) {
  return (
    <>
      <PageHeader
        title="Delivery Collection"
        icon={<PackageCheck className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      {/* stats cards */}
      <CardSection />

      {/* table section */}
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
  let count: any = [{ total: 0 }];
  const limit = 20;
  let connectionError = false;
  let data;
  return (
    <>
      <div className="data-table-section my-6">
        <DeliveryCollectionTable data={[]} connectionError={true} />
        <PagePagination limit={10} count={Number(0)} />
      </div>
    </>
  );
};
