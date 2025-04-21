import { FileUser } from "@/components/constants/icons/icons";
import DaMovementInfoTable from "@/components/da-movement-info/DaMovementInfoTable";
import FilterSection from "@/components/da-movement-info/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import { getDaMovementInfoData } from "./_actions/action";

export const metadata: Metadata = {
  title: "DA Movement Info - ODMS Admin Panel",
};

export default async function DaMovementInfoPage({
  searchParams,
}: {
  searchParams: {
    p: string;
    q: string;
    filter: string;
    start: string;
    end: string;
  };
}) {
  const limit = 20;
  const { data, count, connectionError } = await getDaMovementInfoData(
    searchParams,
    limit
  );


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
        <DataTable
          limit={limit}
          data={data as any[]}
          count={count}
          connectionError={connectionError}
        />
      </Suspense>
    </>
  );
}

const DataTable = async ({
  data,
  connectionError,
  count,
}: {
  data: any[];
  count: number;
  connectionError: boolean;
  limit: number;
}) => {
  return (
    <div className="data-table-section my-6">
      <DaMovementInfoTable
        data={data as any[]}
        connectionError={connectionError}
      />

      <PagePagination limit={20} count={count} />
    </div>
  );
};
