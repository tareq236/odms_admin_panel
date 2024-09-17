import React, { Suspense } from "react";
import Header from "./Header";
import TableSkeleton from "@/components/ui/TableSkeletion";
import PagePagination from "@/components/ui/PagePagination";
import PartnerDeliveryStatsTable from "./PartnerDeliveryStatsTable";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";

export default function PartnerStatsSection({
  searchParams,
}: {
  searchParams: { q: string; p: string };
}) {
  return (
    <section className="my-6 p-5 border rounded-md shadow-sm">
      {/* header */}
      <Header />

      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

const DataTable = async ({
  searchParams,
}: {
  searchParams: { q: string; p: string };
}) => {
  const limit = 10;
  let connectionError = false;
  let data;
  let count: any = [{ total: 0 }];

  try {
    [data, count] = await Promise.all([
      db.$queryRaw(
        Prisma.sql`
          SELECT rds.partner_id, rc.name1, 
          (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) total_return_percentage,
          ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) total_received_percentage,
          IFNULL((SUM(rds.total_collection) / SUM(rds.total_net_val) * 100),0) full_payment_percentage,
          IFNULL((SUM(rds.total_due) / SUM(rds.total_net_val) * 100),0) due_percentage
          FROM rdl_delivery_stats rds
          INNER JOIN rpl_customer rc ON rds.partner_id = rc.partner
          GROUP BY rds.partner_id
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}

        `,
      ),
      db.$queryRaw`
      SELECT COUNT(DISTINCT rds.partner_id) total
      FROM rdl_delivery_stats rds
    `,
    ]);
  } catch (error) {
    data = [] as any[];
    connectionError = true;
    console.log(error);
  }

  return (
    <section className="data-table-section my-6">
      <PartnerDeliveryStatsTable
        connectionError={connectionError}
        data={data as any[]}
      />
      <PagePagination count={Number(count[0].total)} limit={limit} />
    </section>
  );
};
