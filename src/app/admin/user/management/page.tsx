import PageHeader from "@/components/ui/PageHeader";
import FilterSection from "@/components/user/management/FilterSection";
import UserTable from "@/components/user/management/UserTable";
import { UserPen } from "lucide-react";
import React, { Suspense } from "react";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { rdl_users_list } from "@/prisma/generated/client1";
import type { Metadata } from "next";
import { getUsers } from "./_actions/users";
import NoData from "@/components/constants/NoData";

export const metadata: Metadata = {
  title: "User Management - ODMS Admin Panel",
};

export default async function UserManagementPage({
  searchParams,
}: {
  searchParams: { q: string; p: string };
}) {
  return (
    <>
      <PageHeader
        icon={<UserPen className="size-5 fill-primary/20" />}
        title="User Management"
      />

      <Suspense fallback={<p>Loading...</p>}>
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
  const limit = 20;

  const { data, count, error } = await getUsers({
    searchParams: searchParams,
    limit,
  });

  return (
    <section className="data-table-section">
      <UserTable data={data as rdl_users_list[]} error={error} />
      {data.length === 0 && <NoData />}
      <PagePagination limit={limit} count={count} />
    </section>
  );
};
