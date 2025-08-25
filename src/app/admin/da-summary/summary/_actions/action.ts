import { getUser, verifyAuthuser } from "@/lib/dal";
import db from "../../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { redirect } from "next/navigation";
import { hasDepotDa } from "@/lib/permissions";

export const getGatePassBill = async (searchParams: {
  q: string;
  start: string;
}) => {
  const startDate = searchParams.start
    ? `${searchParams.start}`
    : `${formateDateDB(new Date())}`;

  const daCode = Number(searchParams.q) || 0;

  let totalDelivery: any = [{ total_delivery: 0, total_net_val: 0 }];
  let deliveryDone: any = [{ total_delivery_done: 0, total_net_val: 0 }];
  let collectionDone: any = [{ total_collection_done: 0, total_net_val: 0 }];
  let returnQuantity: any = [{ total_return: 0, total_return_amount: 0 }];
  let totalCredit: any = [{ total_credit: 0, total_credit_amount: 0 }];

  const user = await verifyAuthuser();

  console.log(user)

  if (!user) redirect("/login");

  const isDepotDA: any = hasDepotDa(searchParams.q, user.depot as string);

  try {
    if (user.role == "admin" || (isDepotDA && isDepotDA.length > 0)) {
      [
        totalDelivery,
        deliveryDone,
        collectionDone,
        returnQuantity,
        totalCredit,
      ] = await Promise.all([
        db.$queryRaw`
        SELECT sum(sum(c.net_val) + sum(c.vat)) over() as total_net_val,
        count(*) over() as total_delivery
        FROM rdl_delivery_info_sap as a
        INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
        WHERE a.da_code = ${daCode} AND a.billing_date=${startDate} 
        GROUP BY a.billing_doc_no
        limit 1
        `,
        db.$queryRaw`
        SELECT sum(sum(c.net_val) + sum(c.vat)) over() as total_net_val,
        count(*) over() as total_delivery_done
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
        WHERE a.da_code = ${daCode} AND a.billing_date=${startDate}  AND b.delivery_status='Done'
        GROUP BY a.billing_doc_no
        limit 1
        `,
        db.$queryRaw`
        SELECT sum(b.cash_collection) over() as total_net_val,
        count(*) over() as total_collection_done
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        WHERE a.da_code = ${daCode} AND a.billing_date=${startDate}  AND b.cash_collection_status='Done'
        GROUP BY a.billing_doc_no
        limit 1
        `,

        db.$queryRaw`
        select count(DISTINCT rd.billing_doc_no) total_return, sum(rds.return_net_val) total_return_amount
          FROM rdl_delivery rd
          INNER JOIN rdl_delivery_list rds ON rds.delivery_id = rd.id
          WHERE rd.billing_date =${
            searchParams.start
              ? `${searchParams.start}`
              : `${formateDateDB(new Date())}`
          }
          AND rd.da_code = ${daCode} 
          AND rds.return_quantity > 0
        `,
        db.$queryRaw`
          SELECT 
            count(rsis.billing_doc_no) over() total_credit,
            SUM(SUM(rsis.net_val)) OVER() AS total_credit_amount
          FROM rdl_delivery_info_sap rdis
          LEFT JOIN rpl_sales_info_sap rsis 
              ON rsis.billing_doc_no = rdis.billing_doc_no
          WHERE rdis.da_code = ${daCode}
            AND rdis.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            }
            AND rsis.billing_type IN ('ZD2', 'ZD4', 'zd2', 'zd4')
          GROUP BY rsis.billing_doc_no 
          LIMIT 1;
        `,
      ]);
    }
  } catch (error) {
    console.log(error);
  }

  let gatePasses: (unknown | any)[] = [];
  try {
    if (user.role == "admin" || (isDepotDA && isDepotDA.length > 0)) {
      gatePasses = await db.$queryRaw`
      SELECT c.gate_pass_no, (sum(c.net_val) + sum(c.vat)) as total_net_val,
      count(DISTINCT a.billing_doc_no) as total_delivery
      FROM rdl_delivery_info_sap as a
      INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
      LEFT JOIN rdl_delivery rd ON rd.billing_doc_no = a.billing_doc_no
      WHERE a.da_code =${daCode} AND a.billing_date=${
        searchParams.start
          ? `${searchParams.start}`
          : `${formateDateDB(new Date())}`
      }
      GROUP BY c.gate_pass_no
    `;
    }
  } catch (error) {
    console.log(error);
    gatePasses = [];
  }

  let gatePassData = [];
  try {
    if (user.role == "admin" || (isDepotDA && isDepotDA.length > 0)) {
      if (gatePasses.length > 0) {
        for (let i = 0; i < gatePasses.length; i++) {
          let data = await db.$queryRaw`
          SELECT COUNT(b.gate_pass_no) over() total_invoice,
          count(rd.delivery_status) over() total_delivered, 
          COUNT(rd.cash_collection_status) over() total_collection, 
          COUNT(rd.return_status) over() total_return,
          sum(rd.due_amount) over() total_due,
          SUM(rd.cash_collection) OVER() collection_amount,
          SUM(rd.return_amount) OVER() return_amount
          FROM rdl_delivery_info_sap as a
          INNER JOIN rpl_sales_info_sap as b on a.billing_doc_no = b.billing_doc_no
          LEFT JOIN rdl_delivery rd ON rd.billing_doc_no = a.billing_doc_no
          WHERE a.billing_date = ${
            searchParams.start
              ? `${searchParams.start}`
              : `${formateDateDB(new Date())}`
          }
          AND a.da_code = ${daCode}
          and b.gate_pass_no = ${gatePasses[i].gate_pass_no}
          GROUP BY b.billing_doc_no
          LIMIT 1
        `;
          gatePassData.push(data);
        }
      }
    }
  } catch (error) {
    gatePassData = [];
  }

  return {
    gatePassData,
    gatePasses,
    totalDelivery,
    deliveryDone,
    collectionDone,
    returnQuantity,
    totalCredit
  };
};
