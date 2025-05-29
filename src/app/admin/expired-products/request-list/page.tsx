import FilterSection from "@/components/expired-products/FilterSection";
import RequestListTable from "@/components/expired-products/request-list/RequestListTable";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import { ScrollText } from "lucide-react";
import React, { Suspense } from "react";
import { getRequestList } from "../_actions/request-list";
import NoData from "@/components/constants/NoData";
import { SearchParams } from "@/types/params";
import SelectDepot from "@/components/constants/SelectDepot";
import { verifyAutuser } from "@/lib/dal";
import { redirect } from "next/navigation";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { AuthUser } from "@/types/AuthUser";

export default async function ExpiredProductsListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const authUser = await verifyAutuser();

  if (!authUser) return redirect("/login");

  return (
    <>
      <div className="flex items-center justify-between gap-5 flex-wrap mb-6">
        <PageHeader
          title="Request List"
          icon={<ScrollText className="size-5 fill-primary/20" />}
        />

        <Suspense>
          <FilterSection user={authUser} searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <DataTable user={authUser} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const DataTable = async ({
  searchParams,
  user,
}: {
  user: AuthUser;
  searchParams: SearchParams;
}) => {
  const { depot, da_id } = searchParams;

  let validatedDepot = depot as string;

  if (user.role == "depot") {
    validatedDepot = user.depot as string;
  }

  const res = await getRequestList({
    depotCode: validatedDepot as string,
    daId: da_id as string,
  });

  return (
    <section className="data-table-section">
      <RequestListTable data={res.data} error={undefined} />
      {depot && res.data.length === 0 && <NoData />}
      {user.role === "admin" && !depot && <SelectDepot />}
      <PagePagination limit={1} count={1} />
    </section>
  );
};
