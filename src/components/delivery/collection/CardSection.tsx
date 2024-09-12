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

export default async function CardSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  let totalDelivery: any = [{ total_delivery: 0 }];
  let deliveryDone: any = [{ total_delivery_done: 0 }];
  let collectionDone: any = [{ total_collection_done: 0 }];
  let returnQuantity: any = [{ total_return: 0 }];

  const data = await db.$queryRaw`
  SELECT COUNT(*) as total_delivery
  FROM rdl_delivery_info_sap as a
  LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
  LEFT JOIN rdl_delivery_list as e ON b.id = e.delivery_id
          WHERE a.da_code = ${Number(searchParams.q)} AND a.billing_date=${searchParams.start ? new Date(searchParams.start) : new Date()}

  AND b.delivery_status = 'Done'
  LIMIT 100 
  `;
  console.log(data);

  try {
    [totalDelivery, deliveryDone, collectionDone, returnQuantity] = await Promise.all([
      db.$queryRaw`
        SELECT COUNT(*) as total_delivery
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        LEFT JOIN rdl_delivery_list as e ON b.id = e.delivery_id
        WHERE a.da_code = ${Number(searchParams.q)} AND a.billing_date=${searchParams.start ? new Date(searchParams.start) : new Date()}
        `,
      db.$queryRaw`
        SELECT COUNT(*) as total_delivery_done
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        LEFT JOIN rdl_delivery_list as e ON b.id = e.delivery_id
        WHERE a.da_code = ${Number(searchParams.q)} AND a.billing_date=${searchParams.start ? new Date(searchParams.start) : new Date()}
        AND b.delivery_status = 'Done'
        `,
      db.$queryRaw`
        SELECT COUNT(*) as total_collection_done
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        LEFT JOIN rdl_delivery_list as e ON b.id = e.delivery_id
        WHERE a.da_code = ${Number(searchParams.q)} AND a.billing_date=${searchParams.start ? new Date(searchParams.start) : new Date()}
        AND b.cash_collection_status = 'Done'
        `,
        db.$queryRaw`
        SELECT COUNT(*) as total_return
        FROM rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        LEFT JOIN rdl_delivery_list as e ON b.id = e.delivery_id
        WHERE a.da_code = ${Number(searchParams.q)} AND a.billing_date=${searchParams.start ? new Date(searchParams.start) : new Date()}
        AND e.return_quantity IS NOT NULL
        `,
    ]);
  } catch (error) {
    console.log(error);
  }

  return (
    <section>
      <h3 className="text-muted-foreground mb-3">Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 border-t border-l">
        <Card
          paramString="dr"
          name="Delivery Remaining"
          stats={
            Number(totalDelivery[0].total_delivery) -
            Number(deliveryDone[0].total_delivery_done)
          }
          icon={<Package2 className="size-5" />}
        />
        <Card
          paramString="dd"
          name="Delivery Done"
          stats={Number(deliveryDone[0].total_delivery_done)}
          icon={<PackageCheck className="size-5" />}
        />
        <Card
          paramString="cr"
          name="Collection Remainig"
          stats={Number(totalDelivery[0].total_delivery) - Number(collectionDone[0].total_collection_done)}
          icon={<HandCoins className="size-5" />}
        />
        <Card
          paramString="cd"
          name="Collection Done"
          stats={Number(collectionDone[0].total_collection_done)}
          icon={<Handshake className="size-5" />}
        />
        <Card
          paramString="r"
          name="Returned"
          stats={Number(returnQuantity[0].total_return)}
          icon={<PackageMinus className="size-5" />}
        />
      </div>
    </section>
  );
}
