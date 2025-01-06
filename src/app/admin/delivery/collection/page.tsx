import CardSection from "@/components/delivery/collection/CardSection";
import DeliveryCollectionTable from "@/components/delivery/collection/DeliveryCollectionTable";
import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { PackageCheck } from "lucide-react";
import React, { Suspense } from "react";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import CollectionDetailsView from "@/components/delivery/collection/CollectionDetailsView";
import { getDeliveryCollection } from "./_action/action";
import type { Metadata } from "next";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import db from "../../../../../db/db";

export const metadata: Metadata = {
  title: "Delivery Collection - ODMS Admin Panel",
};

export default async function DeliveryCollectionPage({
  searchParams,
}: {
  searchParams: {
    p: string;
    q: string;
    start: string;
    dId: string;
    status: string;
  };
}) {
  const user = await getUser();

  if (!user) redirect("/login");

  const daInfo = await db.rdl_users_list.findFirst({
    where: {
      sap_id: Number(searchParams.q) || undefined,
    },
  });

  return (
    <>
      <PageHeader
        title="Delivery Collection"
        icon={<PackageCheck className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      {(user.role === "admin" || daInfo?.depot_code == user.deport_code) &&
        searchParams.q != null && (
          <>
            <Suspense>
              <DaInfoSection searchParams={searchParams} />
            </Suspense>

            {/* stats cards */}
            <Suspense>
              <CardSection searchParams={searchParams} />
            </Suspense>
          </>
        )}

      {/* table section */}
      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export const DataTable = async ({
  searchParams,
}: {
  searchParams: {
    p: string;
    q: string;
    start: string;
    dId: string;
    status: string;
  };
}) => {
  const limit = 20;

  const { data, count, connectionError } = await getDeliveryCollection({
    searchParams: searchParams,
    limit: limit,
    connectionError: false,
  });

  return (
    <div className="data-table-section my-6">
      <DeliveryCollectionTable
        data={data as any[]}
        connectionError={connectionError}
      >
        {searchParams.dId && (
          <Suspense fallback={<p>Loading...</p>}>
            {/* anc */}
            <CollectionDetailsView searchParams={searchParams} />
          </Suspense>
        )}
      </DeliveryCollectionTable>
      <PagePagination limit={limit} count={Number(count[0]?.total || 0)} />
    </div>
  );
};
