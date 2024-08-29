import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { Truck } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";
import { DeliveryTableProps } from "@/lib/definitions";
import DeliveryTable from "@/components/delivery/DeliveryTable";

export default async function page({searchParams}: {searchParams: {p: string, q: string}}) {
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

const DataTable = async ({searchParams}: {searchParams: {p: string, q: string}}) => {
  let count = 0;
  const limit = 20;
  let connectionError = false;
  let data;

  try {
    [data, count] = await Promise.all([
      db.$queryRaw(
        Prisma.sql`
            SELECT  a.da_code AS sap_id, a.da_name AS full_name, a.route, b.partner, 
            c.description, a.billing_doc_no, a.billing_date, a.vehicle_no, 
            b.gate_pass_no, SUM(b.net_val) AS total_net_val, 
            SUM(b.quantity) AS total_quantity, SUM(b.tp) AS total_tp, 
            COUNT(a.billing_doc_no) as total_count, SUM(b.vat) AS total_vat
            FROM ((rdl_delivery_info_sap AS a
            INNER JOIN rpl_sales_info_sap AS b ON a.billing_doc_no = b.billing_doc_no) 
            INNER JOIN rdl_route_sap AS c ON a.route = c.route) 
            GROUP BY a.billing_doc_no
            LIMIT ${Number( searchParams. p || 1) * limit},${limit}
            `,
      ),
      db.rdl_delivery_info_sap.count(),
    ]);
  } catch (error) {
    data = [];
    connectionError = true;
  }

  return (
    <div className="data-table-section">
      <DeliveryTable
        data={data as DeliveryTableProps[]}
        connectionError={connectionError}
      />
      <PagePagination limit={limit} count={count} />
    </div>
  );
};
