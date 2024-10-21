import ReturnsTable from "@/components/da-summary/returns/ReturnsTable";
import React from "react";
import db from "../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import NoData from "@/components/constants/NoData";

async function ReturnSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  let billingDocs: (unknown | any)[];
  try {
    billingDocs = await db.$queryRaw`
      select rd.billing_doc_no FROM rdl_delivery rd
      INNER JOIN rdl_delivery_list rdl ON rdl.delivery_id = rd.id
      WHERE rd.da_code = ${Number(searchParams.q) || 0} and rd.billing_date = ${
      searchParams.start
        ? `${searchParams.start}`
        : `${formateDateDB(new Date())}`
    } and rdl.return_quantity > 0
      GROUP BY rd.billing_doc_no
    `;
  } catch (error) {
    billingDocs = [];
  }

  let returnProducts;
  try {
    returnProducts = await db.$queryRaw`
    SELECT rsis.matnr, rm.material_name, sum(rdl.return_quantity) quantity, rd.billing_doc_no 
    FROM rdl_delivery rd
    INNER JOIN rdl_delivery_list rdl ON rdl.delivery_id = rd.id
    INNER JOIN rpl_sales_info_sap rsis ON rsis.billing_doc_no = rd.billing_doc_no
    INNER JOIN rpl_material rm ON rm.matnr = rsis.matnr
    WHERE rd.da_code = ${Number(searchParams.q) || 0} and rd.billing_date = ${
      searchParams.start
        ? `${searchParams.start}`
        : `${formateDateDB(new Date())}`
    }  and rdl.return_quantity > 0
    GROUP BY rsis.matnr
    ORDER BY rm.material_name
  `;
  } catch (error) {
    returnProducts = [];
  }

  // single billings
  let singleBills: any[] = [];
  try {
    for (let i = 0; i < billingDocs.length; i++) {
      let data = await db.$queryRaw`
        SELECT rsis.matnr, rm.material_name, (rdl.return_quantity) quantity, rd.billing_doc_no 
        FROM rdl_delivery rd
        INNER JOIN rdl_delivery_list rdl ON rdl.delivery_id = rd.id
        INNER JOIN rpl_sales_info_sap rsis ON rsis.billing_doc_no = rd.billing_doc_no
        INNER JOIN rpl_material rm ON rm.matnr = rsis.matnr
        WHERE rd.da_code = ${
          Number(searchParams.q) || 0
        } and rd.billing_date = ${
        searchParams.start
          ? `${searchParams.start}`
          : `${formateDateDB(new Date())}`
      } 
        and rdl.return_quantity > 0 AND rd.billing_doc_no = ${
          billingDocs[i].billing_doc_no
        }
      `;

      singleBills.push(data)
    }
  } catch (error) {
    singleBills = []
  }

  return (
    <div className="flex flex-col gap-5">
      <ReturnsTable
        show={true}
        title="Overview"
        returnProducts={returnProducts as any[]}
      />

      {
        singleBills &&
        singleBills.length > 0 ?
        singleBills.map(item => (
          <ReturnsTable key={item} title={`Billing No - ${item[0].billing_doc_no}`}
          returnProducts={item} />
        )) : 
        <div className="flex justify-center items-center">
          <NoData />
        </div>
      }
    </div>
  );
}

export default ReturnSummaryPage;
