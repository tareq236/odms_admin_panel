import { NextRequest } from "next/server";
import db from "../../../../db/db";
import { formateDateDB } from "@/lib/formatters";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const daCode = Number(searchParams.get("q"));
  const qDate = `${
    searchParams.has("start")
      ? searchParams.get("start")
      : formateDateDB(new Date())
  }`;
  try {
    const data = await db.$queryRaw`
        SELECT rds.da_code, rds.da_name, rds.billing_doc_no, rds.billing_date, 
        rsis.partner partner_id, rc.name1 partner_name, rc.mobile_no partner_contact,
        rds.route, CONCAT(REPLACE(rc.street, ",", "-"), "-", REPLACE(rc.district, ",", "")) address,
        IFNULL(rd.delivery_status, "-") delivery_status, IFNULL((rd.net_val - rd.return_amount), 0) delivery_amount, 
        IFNULL(rd.return_status, "-") return_status, IFNULL(rd.return_amount,0) return_amount,
        IFNULL(rd.cash_collection_status, "-") cash_collection_status, IFNULL(rd.cash_collection, 0) cash_collection, 
        if(IFNULL(rd.due_amount, 0) > 0, 'YES', 'NO') due_status, IFNULL(rd.due_amount, 0) due_amount, 
        CAST(count(quantity) as DECIMAL) total_product, CAST(sum(rsis.quantity) as DECIMAL) total_quantity,
        rsis.gate_pass_no, rds.vehicle_no, 
        sum(rd.net_val - rd.return_amount) over() total_delivery_amount,
        sum(rd.return_amount) over() total_return,
        sum(rd.cash_collection) over() total_collection,
        sum(rd.due_amount) over() total_due,
        CAST(count(quantity) over() as DECIMAL) overall_product,
        sum(quantity) over() overall_quantity
        FROM rdl_delivery_info_sap rds 
        INNER JOIN rpl_sales_info_sap rsis ON rsis.billing_doc_no =rds.billing_doc_no
        LEFT JOIN rdl_delivery rd ON rd.billing_doc_no = rds.billing_doc_no
        INNER JOIN rpl_customer rc on rc.partner = rsis.partner
        WHERE rds.da_code = ${daCode} AND rds.billing_date = ${qDate}
        GROUP BY rds.billing_doc_no
        ORDER BY rd.delivery_status DESC, rd.cash_collection_status DESC
      `;

    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}
