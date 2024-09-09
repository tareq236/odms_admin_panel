import CardSection from "@/components/delivery/collection/CardSection";
import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { PackageCheck } from "lucide-react";
import React, { Suspense } from "react";

export default function DeliveryCollectionPage() {
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
        <DataTable />
      </Suspense>
    </>
  );
}

const DataTable = async () => {
  return <></>;
};
