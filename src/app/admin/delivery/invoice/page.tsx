import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { ScrollText } from "lucide-react";
import React, { Suspense } from "react";
import DeliveryTable from "@/components/delivery/DeliveryTable";
import { verifyAuthuser } from "@/lib/dal";
import type { Metadata } from "next";
import { getInvoiceInfo } from "./_actions/action";
import DaInfoSection from "@/components/delivery/DaInfoSection";
import db from "../../../../../db/db";
import { AuthUser } from "@/types/AuthUser";
import { odmsPanelAdminPermission } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Delivery Invoice - ODMS Admin Panel",
};

export default async function DevlierInvoicePage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  const user = await verifyAuthuser();

  const daInfo = await db.rdl_users_list.findFirst({
    where: {
      sap_id: Number(searchParams.q) || undefined,
    },
  });

  return (
    <>
      <PageHeader
        title="Delivery Invoices"
        icon={<ScrollText className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      {(odmsPanelAdminPermission(user as AuthUser) ||
        daInfo?.depot_code == user?.depot) &&
        searchParams.q != null && (
          <Suspense>
            <DaInfoSection searchParams={searchParams} />
          </Suspense>
        )}

      <Suspense fallback={<TableSkeleton />}>
        <DataTable user={user as AuthUser} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const DataTable = async ({
  searchParams,
  user,
}: {
  searchParams: { p: string; q: string; start: string };
  user: AuthUser;
}) => {
  let limit = 20;

  const { data, count, connectionError } = await getInvoiceInfo({
    searchParams: searchParams,
    user: user,
    limit: limit,
  });

  return (
    <div className="data-table-section">
      <DeliveryTable data={data as any[]} connectionError={connectionError} />
      <PagePagination limit={limit} count={Number(count[0]?.total || 0)} />
    </div>
  );
};
