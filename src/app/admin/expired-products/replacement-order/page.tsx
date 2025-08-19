import PageHeader from "@/components/ui/PageHeader";
import { List } from "lucide-react";
import React, { Suspense } from "react";
import FilterSection from "@/components/expired-products/FilterSection";
import { verifyAutuser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { SearchParams } from "@/types/params";
import TabSection from "@/components/expired-products/replacement-order/TabSection";
import { AuthUser } from "@/types/AuthUser";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { getReplacementOrders } from "../_actions/replacement-order";
import { ErrorBoundary } from "@/components/boundary/ErrorBoundary";
import PagePagination from "@/components/ui/PagePagination";
import SelectDepot from "@/components/filter/SelectDepot";
import NoData from "@/components/constants/NoData";
import ReplacementOrderTable from "@/components/expired-products/replacement-order/ReplacementOrderTable";

export default async function ReplacementOrderPage({
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
          title="Replacement Order"
          icon={<List className="size-5 fill-primary/20" />}
        />

        <Suspense>
          <FilterSection user={authUser} searchParams={searchParams} />
        </Suspense>
      </div>

      {/* tab */}
      <Suspense>
        <TabSection />
      </Suspense>

      {/* data table */}
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
  const { depot, da_id, replacement } = searchParams;

  let validatedDepot = depot as string;
  const validatedReplacement = replacement ?? "delivery_list";

  if (user.role == "depot") {
    validatedDepot = user.depot as string;
  }

  const res = await getReplacementOrders({
    status: validatedReplacement,
    depot_id: validatedDepot,
    da_id: da_id,
  });

  return (
    <ErrorBoundary error={res.error}>
      {" "}
      <section className="data-table-section">
        {/* {["withdrawal_approval", "withdrawal_approved"].includes(
          validatedWithdrawal as WithdrawalStatus
        ) ? (
          <WithdrawalApprovalTable data={res?.data?.data ?? []} />
        ) : (
          <RequestListTable data={res?.data?.data ?? []} />
        )} */}
        <ReplacementOrderTable data={res?.data?.data ?? []} />

        {validatedDepot && res?.data?.data?.length === 0 && <NoData />}
        {user.role === "admin" && !depot && <SelectDepot />}

        <PagePagination
          limit={Number(res.data.pagination?.per_page ?? 1)}
          count={Number(res.data.pagination?.total_items ?? 1)}
        />
      </section>
    </ErrorBoundary>
  );
};
