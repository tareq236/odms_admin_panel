import CardSection from "@/components/delivery/collection/CardSection";
import DeliveryCollectionTable from "@/components/delivery/collection/DeliveryCollectionTable";
import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { PackageCheck } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import { Prisma } from "@prisma/client";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";

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

      {searchParams.q != null && (
        <>
          <Suspense>
            <DaInfoSection searchParams={searchParams} />
          </Suspense>

          {/* stats cards */}
          <CardSection />
        </>
      )}

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
  let count: any = 0;
  const limit = 20;
  let connectionError = false;
  let data;

  try {
    if (searchParams.q) {
      [data, count] = await Promise.all([
        db.rdl_delivery.findMany({
          where: {
            da_code: searchParams.q,
          },
        }),
        db.rdl_delivery.count({ where: { da_code: searchParams.q } }),
      ]);
    } else {
      data = [];
    }

    console.log(count);
  } catch (error) {
    data = [] as any[];
    connectionError = true;
    console.log(error);
  }

  console.log(data);

  return (
    <>
      <div className="data-table-section my-6">
        <DeliveryCollectionTable
          data={data as any[]}
          connectionError={connectionError}
        />
        <PagePagination limit={limit} count={count} />
      </div>
    </>
  );
};
