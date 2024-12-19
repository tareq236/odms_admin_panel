import { FileUser } from "@/components/constants/icons/icons";
import DaMovementInfoTable from "@/components/da-movement-info/DaMovementInfoTable";
import FilterSection from "@/components/da-movement-info/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import db from "../../../../../db/db";

export const metadata: Metadata = {
  title: "DA Movement Info - ODMS Admin Panel",
};

export default async function DaMovementInfoPage({
  searchParams,
}: {
  searchParams: {
    p: string;
    q: string;
  };
}) {
  return (
    <>
      <PageHeader
        title="DA Movement Info"
        icon={<FileUser className="size-5 fill-primary/20" />}
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
  searchParams: {
    p: string;
    q: string;
  };
}) => {
  const limit = 20;
  let count = 0;
  let data: any[] = [];
  let connectionError = false;

  try {
    [data] = await Promise.all([
        db.rdl_da_movement.findMany()
    ])
  } catch (error) {
    data = [] as any[];
    connectionError = true;
    console.log(error);
  }

  return (
    <div className="data-table-section my-6">
      <DaMovementInfoTable data={data} connectionError={connectionError} />

      <PagePagination limit={limit} count={count} />
    </div>
  );
};
