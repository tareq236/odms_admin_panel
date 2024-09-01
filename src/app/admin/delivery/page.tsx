import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Truck } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../db/db";
import { Prisma, rdl_delivery_info_sap } from "@prisma/client";
import { DeliveryTableProps } from "@/lib/definitions";
import DeliveryTable from "@/components/delivery/DeliveryTable";
import { format, formatDate } from "date-fns";

export default async function page({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  return (
    <>
      <PageHeader
        title="Delivery"
        icon={<Truck className="size-5 fill-primary/20" />}
      />

      <Suspense>
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
  searchParams: { p: string; q: string; start: string };
}) => {
  let count: any = [{total: 0}];
  const limit = 20;
  let connectionError = false;
  let data;

  try {
    if(searchParams.q) {
      [data, count] = await Promise.all([
        db.$queryRaw(
          Prisma.sql`
          SELECT a.*,
          COUNT(b.billing_doc_no) as no_of_bill , b.gate_pass_no,
          SUM(b.quantity), SUM(b.vat), SUM(b.net_val), sum(b.tp),
          c.description address, d.name1 partner_name
          FROM rdl_delivery_info_sap as a
          INNER JOIN rpl_sales_info_sap as b on a.billing_doc_no = b.billing_doc_no
          INNER JOIN rdl_route_sap as c on a.route = c.route
          INNER JOIN rpl_customer as d ON b.partner = d.partner
          WHERE a.billing_date = ${searchParams.start ? new Date(searchParams.start) : new Date()} 
          AND a.da_code = ${Number(searchParams.q) || 0}
          GROUP BY b.billing_doc_no
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit }, ${limit}
            `,
        ),
        db.$queryRaw`
          select count(*) as total from rdl_delivery_info_sap
          where billing_date = ${searchParams.start ? new Date(searchParams.start) : new Date()} 
          AND da_code = ${Number(searchParams.q) || 0}
        `,
      ]);
    } else {
      data = []
    }

      console.log(count)
  } catch (error) {
    data = [] as any[];
    connectionError = true;
  }

  console.log(data);

  return (
    <div className="data-table-section">
      <DeliveryTable
        data={data as any[]}
        connectionError={connectionError}
      />
      <PagePagination limit={limit} count={Number(count[0].total)} />
    </div>
  );
};
