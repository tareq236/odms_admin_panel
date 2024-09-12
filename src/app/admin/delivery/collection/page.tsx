import CardSection from "@/components/delivery/collection/CardSection";
import DeliveryCollectionTable from "@/components/delivery/collection/DeliveryCollectionTable";
import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { PackageCheck } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import CollectionDetailsView from "@/components/delivery/collection/CollectionDetailsView";
import { Prisma } from "@prisma/client";

export default function DeliveryCollectionPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string; dId: string };
}) {
  return (
    <>
      <PageHeader
        title="Delivery Collection"
        icon={<PackageCheck className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      {searchParams.q != null && (
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

const DataTable = async ({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string; dId: string };
}) => {
  let count: any = [{ total: 0 }];
  const limit = 20;
  let connectionError = false;
  let data;

  try {
    if (searchParams.q) {
      [data, count] = await Promise.all([
        db.$queryRaw(
          Prisma.sql`
          SELECT a.billing_date, a.billing_doc_no, 
          b.delivery_status, b.cash_collection_status,
          b.cash_collection, b.due_amount, c.net_val,
          c.partner, b.id,
          d.name1
          FROM rdl_delivery_info_sap as a
          LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
          INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
          INNER JOIN rpl_customer as d ON c.partner=d.partner
          WHERE a.billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND a.da_code = ${Number(searchParams.q) || 0}
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
        ),
        db.$queryRaw`
          select count(*) as total from rdl_delivery_info_sap
          where billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND da_code = ${Number(searchParams.q) || 0}
        `,
      ]);
    } else {
      data = [];
    }

    console.log(count);
  } catch (error) {
    data = [] as any[];
    connectionError = true;
  }

  return (
    <>
      <div className="data-table-section my-6">
        <DeliveryCollectionTable
          data={data as any[]}
          connectionError={connectionError}
        >
          {/* anc */}
          <Suspense fallback={<p>Loading...</p>}>
            <CollectionDetailsView searchParams={searchParams} />
          </Suspense>
        </DeliveryCollectionTable>
        <PagePagination limit={limit} count={Number(count[0].total)} />
      </div>
    </>
  );
};
