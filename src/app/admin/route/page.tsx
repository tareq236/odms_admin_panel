import FilterSection from "@/components/route/FilterSection";
import RouteTable from "@/components/route/RouteTable";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Route } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../db/db";
import { $Enums, Prisma, rdl_route_sap } from "@/prisma/generated/client1";

import type { Metadata } from "next";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export type AuthUserProps = {
  id: number;
  role: $Enums.rdl_admin_user_list_role | null;
  full_name: string;
  deport_code: string | null;
};

export const metadata: Metadata = {
  title: "Route - ODMS Admin Panel",
};

export default async function RoutePage({
  searchParams,
}: {
  searchParams: { q: string; p: string };
}) {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <>
      <PageHeader
        icon={<Route className="size-5 fill-primary/20" />}
        title="Route"
      />

      <Suspense>
        <FilterSection user={user} />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <DataTable user={user} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const DataTable = async ({
  searchParams,
  user,
}: {
  searchParams: { q: string; p: string };
  user: AuthUserProps;
}) => {
  let count = 0;
  let data;
  const limit = 20;
  let connectionError = false;

  try {
    if (user.role === "admin") {
      if (searchParams.q) {
        [data, count] = await Promise.all([
          db.rdl_route_sap.findMany({
            where: {
              OR: [
                {
                  description: {
                    startsWith: searchParams.q,
                  },
                },
                {
                  route: {
                    startsWith: searchParams.q,
                  },
                },
              ],
            },
            orderBy: { created_at: "desc" },
            take: limit,
            skip: limit * (Number(searchParams.p || 1) - 1),
          }),
          db.rdl_route_sap.count({
            where: {
              OR: [
                {
                  description: {
                    startsWith: searchParams.q,
                  },
                },
                {
                  route: {
                    startsWith: searchParams.q,
                  },
                },
              ],
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
    } else {
      if (searchParams.q) {
        [data, count] = await Promise.all([
          db.rdl_route_wise_depot.findMany({
            where: {
              OR: [
                {
                  route_name: {
                    startsWith: searchParams.q,
                  },
                },
                {
                  route_code: {
                    startsWith: searchParams.q,
                  },
                },
                {
                  depot_code: user.deport_code,
                },
              ],
            },
            take: limit,
            skip: limit * (Number(searchParams.p || 1) - 1),
          }),
          db.rdl_route_wise_depot.count({
            where: {
              OR: [
                {
                  route_name: {
                    startsWith: searchParams.q,
                  },
                },
                {
                  route_code: {
                    startsWith: searchParams.q,
                  },
                },
                {
                  depot_code: user.deport_code,
                },
              ],
            },
          }),
        ]);
      } else {
        [data, count] = await Promise.all([
          db.rdl_route_wise_depot.findMany({
            where: {
              depot_code: user.deport_code,
            },
            take: limit,
            skip: limit * (Number(searchParams.p || 1) - 1),
          }),
          db.rdl_route_wise_depot.count({
            where: {
              depot_code: user.deport_code,
            },
          }),
        ]);
      }
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
      <RouteTable
        data={data as rdl_route_sap[]}
        connectionError={connectionError}
        user={user}
      />
      <PagePagination limit={limit} count={count} />
    </section>
  );
};
