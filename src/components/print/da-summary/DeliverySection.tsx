import { formatNumber, formateDateDB } from "@/lib/formatters";
import React from "react";
import db from "../../../../db/db";

async function DeliverySection({
  searchParams,
}: {
  searchParams: { q: string; start: string };
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
        select count(*) over() total_return, sum(rds.return_net_val) total_return_amount, rds.*
            FROM rdl_delivery rd
            INNER JOIN rdl_delivery_list rds ON rds.delivery_id = rd.id
            WHERE rd.billing_date =${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            }
            AND rd.da_code = ${Number(searchParams.q) || 0} 
            AND rds.return_quantity > 0
            GROUP BY rds.delivery_id
            limit 1
        `,
      ]);
  } catch (error) {
    console.log(error);
  }

  return (
    <section>
      <h2 className="h2">Delivery Information</h2>

      <section>
        <table className="w-full table">
          <tbody>
            <tr>
              <td>Total Delivery</td>
              <td>{formatNumber(totalDelivery[0]?.total_delivery || 0)}</td>
              <td>Total Delivery Amount</td>
              <td>{formatNumber(totalDelivery[0]?.total_net_val || 0)}</td>
            </tr>
            <tr>
              <td>Delivery Remaining</td>
              <td>
                {formatNumber(
                  Number(totalDelivery[0]?.total_delivery || 0) -
                    Number(deliveryDone[0]?.total_delivery_done || 0),
                )}
              </td>
              <td>Delivery Remaining Amount</td>
              <td>
                {formatNumber(
                  Number(totalDelivery[0]?.total_net_val || 0) -
                    Number(deliveryDone[0]?.total_net_val || 0),
                )}
              </td>
            </tr>
            <tr>
              <td>Delivery Done</td>
              <td>{formatNumber(deliveryDone[0]?.total_delivery_done || 0)}</td>
              <td>Delivery Done Amount</td>
              <td>{formatNumber(deliveryDone[0]?.total_net_val || 0)}</td>
            </tr>
            <tr>
              <td>Total Collection</td>
              <td>{formatNumber(collectionDone[0]?.total_collection_done || 0)}</td>
              <td>Collection Amount</td>
              <td>{formatNumber(collectionDone[0]?.total_net_val || 0)}</td>
            </tr>
            <tr>
              <td>Total Return</td>
              <td>{formatNumber(returnQuantity[0]?.total_return || 0)}</td>
              <td>Return Amount</td>
              <td>{formatNumber(returnQuantity[0]?.total_return_amount || 0)}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default DeliverySection;
