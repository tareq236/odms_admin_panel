import FilterSection from "@/components/route/FilterSection";
import RouteTable from "@/components/route/RouteTable";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Route } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../db/db";
import { Prisma, rdl_route_sap } from "@prisma/client";

export default async function RoutePage({
  searchParams,
}: {
  searchParams: { q: string; p: string };
}) {
  return (
    <>
      <PageHeader
        icon={<Route className="size-5 fill-primary/20" />}
        title="Route"
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
  searchParams: { q: string; p: string };
}) => {
  let count = 0;
  let data;
  const limit = 20;
  let connectionError = false;

  try {
    if (searchParams.q) {
      [data, count] = await Promise.all([
        db.rdl_route_sap.findMany({
          where: {
            description: {
              startsWith: searchParams.q,
            },
          },
          orderBy: { created_at: "desc" },
          take: limit,
          skip: limit * (Number(searchParams.p || 1) - 1),
        }),
        db.rdl_route_sap.count({
          where: {
            description: {
              contains: searchParams.q,
            },
          },
        }),
      ]);
    } else {
      [data, count] = await Promise.all([
        db.rdl_route_sap.findMany({
          orderBy: { created_at: "desc" },
          take: limit,
          skip: limit * (Number(searchParams.p || 1) - 1),
        }),
        db.rdl_route_sap.count(),
      ]);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if ((error.code = "P1001")) {
        data = [] as rdl_route_sap[];
        connectionError = true;
      }
    }
  }

  return (
    <section className="data-table-section">
      <RouteTable data={data as rdl_route_sap[]} connectionError={connectionError} />
      <PagePagination limit={limit} count={count} />
    </section>
  );
};
