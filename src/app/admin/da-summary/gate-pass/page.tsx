import GatePassTable from "@/components/da-summary/gate-pass/GatePassTable";
import React from "react";
import db from "../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";

async function GatePassSummaryPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  let totalDelivery: any = [{ total_delivery: 0, total_net_val: 0 }];
  let deliveryDone: any = [{ total_delivery_done: 0, total_net_val: 0 }];
  let collectionDone: any = [{ total_collection_done: 0, total_net_val: 0 }];
  let returnQuantity: any = [{ total_return: 0, total_return_amount: 0 }];

  try {
    [totalDelivery, deliveryDone, collectionDone, returnQuantity] =
      await Promise.all([
        db.$queryRaw`
        SELECT sum(sum(c.net_val) + sum(c.vat)) over() as total_net_val,
        count(*) over() as total_delivery
        FROM rdl_delivery_info_sap as a
        INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
        WHERE a.da_code = ${Number(searchParams.q) || 0} AND a.billing_date=${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        } 
        GROUP BY a.billing_doc_no
        limit 1
        `,
        db.$queryRaw`
        SELECT sum(sum(c.net_val) + sum(c.vat)) over() as total_net_val,
        count(*) over() as total_delivery_done
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
        WHERE a.da_code = ${Number(searchParams.q) || 0} AND a.billing_date=${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        }  AND b.delivery_status='Done'
        GROUP BY a.billing_doc_no
        limit 1
        `,
        db.$queryRaw`
        SELECT sum(b.cash_collection) over() as total_net_val,
        count(*) over() as total_collection_done
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        WHERE a.da_code = ${Number(searchParams.q) || 0} AND a.billing_date=${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        }  AND b.cash_collection_status='Done'
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
            AND rd.da_code = ${Number(searchParams.q) || 0} 
            AND rds.return_quantity > 0
        `,
      ]);
  } catch (error) {
    console.log(error);
  }

  let gatePasses: (unknown | any)[];
  try {
    gatePasses = await db.$queryRaw`
      SELECT c.gate_pass_no, (sum(c.net_val) + sum(c.vat)) as total_net_val,
      count(DISTINCT a.billing_doc_no) as total_delivery
      FROM rdl_delivery_info_sap as a
      INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
      LEFT JOIN rdl_delivery rd ON rd.billing_doc_no = a.billing_doc_no
      WHERE a.da_code =${Number(searchParams.q) || 0} AND a.billing_date=${
      searchParams.start
        ? `${searchParams.start}`
        : `${formateDateDB(new Date())}`
    }
      GROUP BY c.gate_pass_no
    `;
  } catch (error) {
    console.log(error);
    gatePasses = [];
  }

  let gatePassData = [];
  try {
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
          AND a.da_code = ${Number(searchParams.q) || 0}
          and b.gate_pass_no = ${gatePasses[i].gate_pass_no}
          GROUP BY b.billing_doc_no
          LIMIT 1
        `;
        console.log("i");
        gatePassData.push(data);
      }
    }
  } catch (error) {
    gatePassData = [];
  }


  return (
    <section className="flex flex-col gap-8">
      {/* overview */}
      <GatePassTable
        show={true}
        totalInvoice={Number(totalDelivery[0]?.total_delivery || 0)}
        totalAmount={Number(totalDelivery[0]?.total_net_val || 0)}
        totalDelivered={deliveryDone[0]?.total_delivery_done || 0}
        totalDeliveredAmount={
          Number(deliveryDone[0]?.total_net_val || 0) -
          Number(returnQuantity[0]?.total_return_amount || 0)
        }
        deliveryRemaining={
          Number(totalDelivery[0]?.total_delivery || 0) -
          Number(deliveryDone[0]?.total_delivery_done || 0)
        }
        deliveryRemainingAmount={
          Number(totalDelivery[0]?.total_net_val || 0) -
          Number(deliveryDone[0]?.total_net_val || 0)
        }
        cashCollection={Number(collectionDone[0]?.total_collection_done || 0)}
        cashCollectionAmount={Number(collectionDone[0]?.total_net_val || 0)}
        cashCollectionRemaining={
          Number(deliveryDone[0]?.total_delivery_done || 0) -
          Number(collectionDone[0]?.total_collection_done || 0)
        }
        cashCollectionRemainingAmount={
          Number(deliveryDone[0]?.total_net_val || 0) -
          Number(collectionDone[0]?.total_net_val || 0) -
          Number(returnQuantity[0]?.total_return_amount || 0)
        }
        totalReturn={Number(returnQuantity[0]?.total_return || 0)}
        returnAmount={Number(returnQuantity[0]?.total_return_amount || 0)}
      />

      {/* single gate pass */}
      {/* <GatePassTable title='Gate Pass - 2446002269'/> */}
      {gatePassData &&
        gatePassData.map((item: any, index) => (
          <GatePassTable
            key={index}
            title={`Gate pass no. - ${gatePasses[index].gate_pass_no}`}
            totalAmount={Number(gatePasses[index].total_net_val)}
            totalInvoice={Number(item[0].total_invoice || 0)}
            cashCollection={Number(item[0].total_collection || 0)}
            cashCollectionAmount={Number(item[0].collection_amount || 0)}
            totalDelivered={Number(item[0].total_delivered || 0)}
            totalDeliveredAmount={
              Number(item[0].total_due || 0) +
              Number(item[0].collection_amount || 0)
            }
            deliveryRemaining={
              Number(item[0].total_invoice || 0) -
              Number(item[0].total_delivered || 0)
            }
            deliveryRemainingAmount={
              Number(gatePasses[index].total_net_val) -
              Number(item[0].total_due || 0) -
              Number(item[0].return_amount || 0)
            }
            returnAmount={Number(item[0].return_amount || 0)}
            totalReturn={Number(item[0].total_return || 0)}
            cashCollectionRemaining={
              Number(item[0].total_delivered || 0) -
              Number(item[0].total_collection || 0)
            }
            cashCollectionRemainingAmount={
              Number(item[0].total_due || 0)
          }
          />
        ))}
    </section>
  );
}

export default GatePassSummaryPage;
