import FilterSection from "@/components/expired-products/FilterSection";
import RequestListTable from "@/components/expired-products/request-list/withdrawal-pending/RequestListTable";
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
import TabSection from "@/components/expired-products/request-list/TabSection";
import ConfirmationListTable from "@/components/expired-products/request-list/withdrawal-confirmation/ConfirmationListTable";

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

      {/* tab */}
      <Suspense>
        <TabSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <RequestTableContainer user={authUser} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const RequestTableContainer = async ({
  searchParams,
  user,
}: {
  user: AuthUser;
  searchParams: SearchParams;
}) => {
  const { depot, da_id, withdrawal } = searchParams;

  let validatedDepot = depot as string;
  const validatedWithdrawal = withdrawal ?? "request_approved";

  if (user.role == "depot") {
    validatedDepot = user.depot as string;
  }

  const res = await getRequestList({
    status: validatedWithdrawal,
    depot_id: validatedDepot,
    da_id: da_id,
  });

  return (
    <section className="data-table-section">
      <RequestListTable data={res?.data.data} error={undefined} />
      {validatedDepot && res?.data?.data?.length === 0 && <NoData />}
      {user.role === "admin" && !depot && <SelectDepot />}

      <PagePagination
        limit={Number(res.data.pagination.per_page ?? 0)}
        count={Number(res.data.pagination.total_items ?? 0)}
      />
    </section>
  );
};
