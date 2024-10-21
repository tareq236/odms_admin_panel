import ReturnsTable from "@/components/da-summary/returns/ReturnsTable";
import React from "react";
import db from "../../../../../db/db";
import {formateDateDB} from '@/lib/formatters';

async function ReturnSummaryPage({searchParams}: {searchParams: {q: string, start: string}}) {
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
    returnProducts = []
  }

  return (
    <div className="">
      <ReturnsTable show={true} title="Overview" returnProducts={returnProducts as any[]} />
    </div>
  );
}

export default ReturnSummaryPage;
