import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Truck } from "lucide-react";
import React, { Suspense } from "react";

export default async function page() {
  return (
    <>
      <PageHeader
        title="Delivery"
        icon={<Truck className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </>
  );
}

const DataTable = async () => {
  let limit = 20;
  let count = 0;

  return (
    <div className="data-table-section">
      <PagePagination limit={limit} count={count} />
    </div>
  );
};
