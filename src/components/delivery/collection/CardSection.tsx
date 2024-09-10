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
  const [totalDelivery, deliveryDone, collectionDone] = await Promise.all([
    db.rdl_delivery.count({ where: { da_code: searchParams.q || "" } }),
    db.rdl_delivery.count({ where: { AND: [
      {da_code: searchParams.q || ""},
      {delivery_status: 'Done'}
    ] } }),
    db.rdl_delivery.count({ where: { AND: [
      {da_code: searchParams.q || ""},
      {cash_collection_status: 'Done'}
    ] } }),
  ]);

  return (
    <section>
      <h3 className="text-muted-foreground mb-3">Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 border-t border-l">
        <Card
          name="Delivery Remaining"
          stats={(totalDelivery-deliveryDone)}
          icon={<Package2 className="size-5" />}
        />
        <Card
          name="Delivery Done"
          stats={deliveryDone}
          icon={<PackageCheck className="size-5" />}
        />
        <Card
          name="Collection Remainig"
          stats={(totalDelivery - collectionDone)}
          icon={<HandCoins className="size-5" />}
        />
        <Card
          name="Collection Done"
          stats={collectionDone}
          icon={<Handshake className="size-5" />}
        />
        <Card
          name="Returned"
          stats={0}
          icon={<PackageMinus className="size-5" />}
        />
      </div>
    </section>
  );
}
