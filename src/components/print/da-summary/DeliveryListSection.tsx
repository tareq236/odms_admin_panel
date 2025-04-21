import db from "../../../../db/db";
import React from "react";
import { formateDateDB, formatDate, formatNumber } from "@/lib/formatters";

async function DeliveryListSection({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  let data: any[] | unknown[];

  try {
    data = await db.$queryRaw`
                        SELECT a.billing_date, a.billing_doc_no, 
                        b.delivery_status, b.cash_collection_status,
                        (b.return_amount) return_amount,
                        (b.cash_collection) cash_collection, (b.due_amount) due_amount, sum(c.net_val) + sum(c.vat) as net_val,
                        c.partner, b.id,
                        d.name1
                        FROM rdl_delivery_info_sap as a
                        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
                        INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
                        INNER JOIN rpl_customer as d ON c.partner=d.partner
                        WHERE a.billing_date = ${
                          searchParams.start
                            ? `${searchParams.start}`
                            : `${formateDateDB(new Date())}`
                        } 
                        AND a.da_code = ${Number(searchParams.q) || 0} 
                        GROUP BY a.billing_doc_no
                          `;
  } catch (error) {
    data = [] as any[];
  }

  return (
    <section>
      <h2 className="h2">Delivery List</h2>

      <table className="w-full table">
        <thead>
          <tr>
            <th>Billing No.</th>
            <th>Partner</th>
            <th>Delivery Status</th>
            <th>Collection Status</th>
            <th>Collection</th>
            <th>Due</th>
            <th>Returned</th>
            <th>Net Value</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.billing_doc_no}</td>
                <td>
                  {item.name1} ({item.partner})
                </td>
                <td>
                  {item.delivery_status ? (
                    <span className="text-green-700">
                      {item.delivery_status}
                    </span>
                  ) : (
                    <span className="text-yellow-700">Pending</span>
                  )}
                </td>
                <td>
                  {item.cash_collection_status ? (
                    <span className="text-green-700">
                      {item.cash_collection_status}
                    </span>
                  ) : (
                    <span className="text-yellow-700">Pending</span>
                  )}
                </td>
                <td>{formatNumber(Number(item.cash_collection))}</td>
                <td>{formatNumber(Number(item.due_amount))}</td>
                <td>{formatNumber(Number(item.return_amount))}</td>
                <td>
                  {formatNumber(
                    Number(item.net_val) - Number(item.return_amount),
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default DeliveryListSection;
