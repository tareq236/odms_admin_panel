import React from "react";
import Card from "./Card";
import {
  HandCoins,
  Handshake,
  Package2,
  PackageCheck,
  PackageMinus,
} from "lucide-react";
import db from "../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { getUser } from "@/lib/dal";

export default async function CardSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  const user = await getUser();

  let totalDelivery: any = [{ total_delivery: 0, total_net_val: 0 }];
  let deliveryDone: any = [{ total_delivery_done: 0, total_net_val: 0 }];
  let collectionDone: any = [{ total_collection_done: 0, total_net_val: 0 }];
  let returnQuantity: any = [{ total_return: 0, total_return_amount: 0 }];

  const isDepotDA: any = await db.$queryRaw`
    select count(*) over () as total
    from
        rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
    WHERE
        a.billing_date = ${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        }
        AND a.da_code = ${Number(searchParams.q) || 0}
        AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
                depot_code = ${user?.depot_code}
        )
  `;

  try {
    if (user?.role === "admin" || (isDepotDA && isDepotDA.length > 0)) {
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
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <section>
      <h3 className="text-muted-foreground mb-3">Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        <Card
          paramString="dr"
          name="Delivery Remaining"
          stats={
            Number(totalDelivery[0]?.total_delivery || 0) -
            Number(deliveryDone[0]?.total_delivery_done || 0)
          }
          amount={
            Number(totalDelivery[0]?.total_net_val || 0) -
            Number(deliveryDone[0]?.total_net_val || 0)
          }
          icon={<Package2 className="size-4" />}
          isDown
        />
        <Card
          paramString="dd"
          name="Delivery Done"
          stats={Number(deliveryDone[0]?.total_delivery_done || 0)}
          amount={
            Number(deliveryDone[0]?.total_net_val || 0) -
            Number(returnQuantity[0]?.total_return_amount || 0)
          }
          icon={<PackageCheck className="size-4" />}
        />

        <Card
          paramString="cr"
          name="Collection Remainig"
          stats={
            Number(deliveryDone[0]?.total_delivery_done || 0) -
            Number(collectionDone[0]?.total_collection_done || 0)
          }
          amount={
            Number(deliveryDone[0]?.total_net_val || 0) -
              Number(collectionDone[0]?.total_net_val || 0) -
              Number(returnQuantity[0]?.total_return_amount || 0) >
            0.01
              ? Number(deliveryDone[0]?.total_net_val || 0) -
                Number(collectionDone[0]?.total_net_val || 0) -
                Number(returnQuantity[0]?.total_return_amount || 0)
              : 0
          }
          icon={<HandCoins className="size-4" />}
          isDown
        />
        <Card
          paramString="cd"
          name="Collection Done"
          stats={Number(collectionDone[0]?.total_collection_done || 0)}
          amount={Number(collectionDone[0]?.total_net_val || 0)}
          icon={<Handshake className="size-4" />}
        />
        <Card
          paramString="r"
          name="Returned"
          stats={Number(returnQuantity[0]?.total_return || 0)}
          amount={Number(returnQuantity[0]?.total_return_amount || 0)}
          icon={<PackageMinus className="size-4" />}
          isDown
        />
      </div>
    </section>
  );
}
