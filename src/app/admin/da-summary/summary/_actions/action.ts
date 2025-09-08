import { verifyAuthuser } from "@/lib/dal";
import db from "../../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { redirect } from "next/navigation";
import { hasDepotDa, odmsPanelAdminPermission } from "@/lib/permissions";
import { AuthUser } from "@/types/AuthUser";

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
  let totalDue: any = [{ total_due: 0, total_due_amount: 0 }];
  let totalCollectionRemaining: any = [
    { total_net_val: 0, total_collection_remaining: 0 },
  ];

  const user = await verifyAuthuser();
  if (!user) redirect("/login");

  const isDepotDA = await hasDepotDa(daCode.toString(), user.depot as string);

  const isPermitted =
    odmsPanelAdminPermission(user as AuthUser) ||
    (isDepotDA && isDepotDA.length > 0);

  try {
    if (isPermitted) {
      [
        totalDelivery,
        deliveryDone,
        collectionDone,
        returnQuantity,
        totalCredit,
        totalDue,
        totalCollectionRemaining,
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
            SUM(SUM(rsis.net_val + rsis.vat)) OVER() AS total_credit_amount
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
        db.$queryRaw`
        SELECT sum(rd.due_amount) over() total_due_amount,
            COUNT(*) over() total_due
        FROM rdl_delivery rd
            LEFT JOIN rpl_sales_info_sap rsis on rsis.billing_doc_no = rd.billing_doc_no
         WHERE rd.da_code = ${daCode}
            AND rd.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            }
            AND rd.due_amount > 0
            AND rd.cash_collection = 0
            AND rd.cash_collection_status = "Done"
            AND rsis.billing_type NOT IN ('ZD2', 'ZD4')
        GROUP BY rd.billing_doc_no
        limit 1
        `,
        db.$queryRaw`
          SELECT sum(b.net_val) over() as total_net_val,
              count(*) over() as total_collection_done
          FROM rdl_delivery_info_sap as a
              LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
              left JOIN rpl_sales_info_sap c on c.billing_doc_no = a.billing_doc_no
          WHERE a.da_code = ${daCode}
              AND a.billing_date = ${startDate}
              AND b.cash_collection_status is null
              AND b.delivery_status='Done'
                AND c.billing_type NOT IN ('ZD2', 'ZD4')
          GROUP BY a.billing_doc_no
          limit 1
        `,
      ]);
    }
  } catch (error) {
    console.log(error);
  }

  // get gate pass list
  let gatePasses: (unknown | any)[] = [];
  try {
    if (isPermitted) {
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

  // get gatepass specific data
  let gatePassData = [];
  try {
    if (isPermitted) {
      if (gatePasses.length > 0) {
        for (let i = 0; i < gatePasses.length; i++) {
          let data = await db.$queryRaw`
          SELECT
            COUNT(b.gate_pass_no) OVER () AS total_invoice,
            COUNT(rd.delivery_status) OVER () AS total_delivered,
            COUNT(rd.cash_collection_status) OVER () AS total_collection,
            COUNT(CASE WHEN rd.return_status = 1 THEN 1 END) over() AS total_return,
            SUM(rd.due_amount) OVER () AS total_due_amount,
            count(rd.due_amount) OVER () AS total_due,
            SUM(rd.cash_collection) OVER () AS collection_amount,
            SUM(rd.return_amount) OVER () AS return_amount,
            sum(
                SUM(
                    (
                        CASE
                            WHEN b.billing_type IN ('ZD2', 'ZD4', 'zd2', 'zd4') THEN b.net_val + b.vat
                            ELSE 0
                        END
                    )
                )
            ) OVER () AS total_credit_amount,
            COUNT(
                CASE
                    WHEN b.billing_type IN ('ZD2', 'ZD4', 'zd2', 'zd4') THEN b.billing_doc_no
                END
            ) OVER () AS total_credit
        FROM
            rdl_delivery_info_sap AS a
            INNER JOIN rpl_sales_info_sap AS b ON a.billing_doc_no = b.billing_doc_no
            LEFT JOIN rdl_delivery rd ON rd.billing_doc_no = a.billing_doc_no
       WHERE a.billing_date = ${
         searchParams.start
           ? `${searchParams.start}`
           : `${formateDateDB(new Date())}`
       }
          AND a.da_code = ${daCode}
          AND b.gate_pass_no = ${gatePasses[i].gate_pass_no}
        GROUP BY
            b.billing_doc_no
        LIMIT 1;
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
    totalCredit,
    totalDue,
    totalCollectionRemaining,
  };
};
