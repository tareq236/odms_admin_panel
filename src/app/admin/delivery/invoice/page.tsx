import FilterSection from "@/components/delivery/FilterSection";
import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import { ScrollText } from "lucide-react";
import React, { Suspense } from "react";
import DeliveryTable from "@/components/delivery/DeliveryTable";
import db from "../../../../../db/db";
import { format } from "date-fns";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Invoice - ODMS Admin Panel",
};

export default async function DevlierInvoicePage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
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
  let count: any = [{ total: 0 }];
  const limit = 20;
  let connectionError = false;
  let data;

  const user = await getUser();

  if (!user) redirect("/login");


  try {
    if (searchParams.q) {
      if (user.role == "admin") {
        [data, count] = await Promise.all([
          db.$queryRaw`
            SELECT a.*,
            COUNT(b.billing_doc_no) as no_of_bill , b.gate_pass_no,
            SUM(b.quantity) as total_quantity, 
            SUM(b.vat) as total_vat, SUM(b.net_val) as total_net_val, 
            sum(b.tp) as total_tp,
            c.description address, d.name1 partner_name
            FROM rdl_delivery_info_sap as a
            INNER JOIN rpl_sales_info_sap as b on a.billing_doc_no = b.billing_doc_no
            INNER JOIN rdl_route_sap as c on a.route = c.route
            INNER JOIN rpl_customer as d ON b.partner = d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND a.da_code = ${Number(searchParams.q) || 0}
            GROUP BY b.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,

          db.$queryRaw`
            select count(*) as total from rdl_delivery_info_sap a
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND da_code = ${Number(searchParams.q) || 0}
          `,
        ]);
      } else {
        [data, count] = await Promise.all([
          db.$queryRaw`
            SELECT a.*,
            COUNT(b.billing_doc_no) as no_of_bill , b.gate_pass_no,
            SUM(b.quantity) as total_quantity, 
            SUM(b.vat) as total_vat, SUM(b.net_val) as total_net_val, 
            sum(b.tp) as total_tp,
            c.description address, d.name1 partner_name
            FROM rdl_delivery_info_sap as a
            INNER JOIN rpl_sales_info_sap as b on a.billing_doc_no = b.billing_doc_no
            INNER JOIN rdl_route_sap as c on a.route = c.route
            INNER JOIN rpl_customer as d ON b.partner = d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND a.da_code = ${Number(searchParams.q) || 0}
            AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
              depot_code = ${user.deport_code}
            )
            GROUP BY b.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,

          db.$queryRaw`
            select count(*) as total from rdl_delivery_info_sap a
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND da_code = ${Number(searchParams.q) || 0}
            AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
                depot_code = ${user.deport_code}
            )
          `,
        ]);
      }
    } else {
      data = [];
    }

    console.log(count);
  } catch (error) {
    data = [] as any[];
    connectionError = true;
  }

  return (
    <div className="data-table-section">
      <DeliveryTable data={data as any[]} connectionError={connectionError} />
      <PagePagination limit={limit} count={Number(count[0]?.total || 0)} />
    </div>
  );
};
