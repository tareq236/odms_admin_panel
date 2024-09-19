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
  searchParams: {
    p: string;
    q: string;
    start: string;
    dId: string;
    status: string;
  };
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
  searchParams: {
    p: string;
    q: string;
    start: string;
    dId: string;
    status: string;
  };
}) => {
  let count: any = [{ total: 0 }];
  const limit = 20;
  let connectionError = false;
  let data;

  try {
    if (searchParams.q && searchParams.status) {
      // delivery done
      if (searchParams.status == "dd") {
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
          AND b.delivery_status='Done'
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
          ),
          db.$queryRaw`
          select count(*) as total from rdl_delivery_info_sap as a
          LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
          where a.billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND a.da_code = ${Number(searchParams.q) || 0}
          AND b.delivery_status = 'Done'
        `,
        ]);
      }
      // delivery remaining
      else if (searchParams.status == "dr") {
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
          AND b.delivery_status IS NULL
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
          ),
          db.$queryRaw`
          select count(*) as total from rdl_delivery_info_sap as a
          LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
          where a.billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND a.da_code = ${Number(searchParams.q) || 0}
          AND b.delivery_status IS NULL
        `,
        ]);
      }
      // collection done
      else if (searchParams.status == "cd") {
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
          AND b.cash_collection_status='Done'
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
          ),
          db.$queryRaw`
          select count(*) as total from rdl_delivery_info_sap as a
          LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
          where a.billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND a.da_code = ${Number(searchParams.q) || 0}
          AND b.cash_collection_status = 'Done'
        `,
        ]);
      }
      // collection remaining
      else if (searchParams.status == "cr") {
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
          AND b.cash_collection_status IS NULL
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
          ),
          db.$queryRaw`
          select count(*) as total from rdl_delivery_info_sap as a
          LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
          where a.billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND a.da_code = ${Number(searchParams.q) || 0}
          AND b.cash_collection_status IS NULL
        `,
        ]);
      }
      else if (searchParams.status == "r") {
        [data, count] = await Promise.all([
          db.$queryRaw(
            Prisma.sql`
          SELECT a.billing_date, a.billing_doc_no, 
          b.delivery_status, b.cash_collection_status,
          b.cash_collection, b.due_amount, c.net_val,
          c.partner, b.id,
          d.name1,
          e.return_quantity
          FROM rdl_delivery_info_sap as a
          LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
          INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
          INNER JOIN rpl_customer as d ON c.partner=d.partner
          LEFT JOIN rdl_delivery_list as e ON b.id = e.delivery_id
          WHERE a.billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND a.da_code = ${Number(searchParams.q) || 0} 
          AND e.return_quantity IS NOT NULL
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
          ),
          db.$queryRaw`
          select count(*) as total from rdl_delivery_info_sap as a
          LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
          LEFT JOIN rdl_delivery_list as e ON b.id = e.delivery_id
          where a.billing_date = ${
            searchParams.start ? new Date(searchParams.start) : new Date()
          } 
          AND a.da_code = ${Number(searchParams.q) || 0}
          AND e.return_quantity IS NOT NULL
        `,
        ]);
      } else {
        throw new Error()
      }
    } else if (searchParams.q) {
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
          {searchParams.dId && (
            <Suspense fallback={<p>Loading...</p>}>
              {/* anc */}
              <CollectionDetailsView searchParams={searchParams} />
            </Suspense>
          )}
        </DeliveryCollectionTable>
        <PagePagination limit={limit} count={Number(count[0].total)} />
      </div>
    </>
  );
};
