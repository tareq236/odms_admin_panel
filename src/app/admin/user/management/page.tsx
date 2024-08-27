import PageHeader from "@/components/ui/PageHeader";
import FilterSection from "@/components/user/management/FilterSection";
import UserTable from "@/components/user/management/UserTable";
import { UserPen } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { rdl_user_list } from "@prisma/client";

export default async function UserManagementPage({
  searchParams,
}: {
  searchParams: { q: string; p: string };
}) {
  return (
    <>
      <PageHeader
        icon={<UserPen className="size-5" />}
        title="User Management"
      />
      <FilterSection />

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
  let count;
  let data;
  const limit = 20;

  if (searchParams.q) {
    [data, count] = await Promise.all([
      db.rdl_user_list.findMany({
        where: {
          OR: [
            { full_name: { contains: searchParams.q } },
            { mobile_number: { startsWith: searchParams.q } },
            { sap_id: Number(searchParams.q) || 0 },
          ],
        },
        orderBy: { created_at: "desc" },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_user_list.count({
        where: {
          OR: [
            { full_name: { contains: searchParams.q } },
            { mobile_number: { startsWith: searchParams.q } },
            { sap_id: Number(searchParams.q) || 0 },
          ],
        },
      }),
    ]);
  } else {
    [data, count] = await Promise.all([
      db.rdl_user_list.findMany({
        orderBy: { created_at: "desc" },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_user_list.count(),
    ]);
  }

  return (
    <section className="data-table-section">
      <UserTable data={data as rdl_user_list[]} />
      <PagePagination limit={limit} count={count} />
    </section>
  );
};
