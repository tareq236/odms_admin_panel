import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { ScrollText } from "lucide-react";
import React, { Suspense } from "react";
import DeliveryTable from "@/components/delivery/DeliveryTable";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AuthUserProps } from "../../route/page";
import { getInvoiceInfo } from "./_actions/action";

export const metadata: Metadata = {
  title: "Delivery Invoice - ODMS Admin Panel",
};

export default async function DevlierInvoicePage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <>
      <PageHeader
        title="Delivery Invoices"
        icon={<ScrollText className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
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
  searchParams: { p: string; q: string; start: string };
  user: AuthUserProps;
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
