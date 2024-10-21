import GatePassTable from "@/components/da-summary/gate-pass/GatePassTable";
import React from "react";
import db from "../../../../../db/db";
import { formatNumber, formateDateDB } from "@/lib/formatters";

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
    </section>
  );
}

export default GatePassSummaryPage;
