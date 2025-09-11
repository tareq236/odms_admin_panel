import React from "react";
import Card from "./Card";
import {
  HandCoins,
  Handshake,
  Package2,
  PackageCheck,
  PackageMinus,
} from "lucide-react";
import { getDeliveryCollectionStats } from "@/app/admin/delivery/collection/_action/card-stat";

export default async function CardSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  const { data } = await getDeliveryCollectionStats(searchParams);

  return (
    <section>
      <h3 className="text-muted-foreground mb-3">Statistics</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        <Card
          paramString="dr"
          name="Delivery Remaining"
          stats={
            Number(data[0]?.total_invoice || 0) -
            Number(data[0]?.total_delivered || 0)
          }
          amount={
            Number(data[0]?.total_amount || 0) -
            Number(data[0]?.total_delivered_done_amount || 0)
          }
          icon={<Package2 className="size-4" />}
          isDown
        />
        <Card
          paramString="dd"
          name="Delivery Done"
          stats={Number(data[0]?.total_delivered || 0)}
          amount={
            Number(data[0]?.total_delivered_done_amount || 0) -
            Number(data[0]?.return_amount || 0)
          }
          icon={<PackageCheck className="size-4" />}
        />

        <Card
          paramString="cr"
          name="Collection Remaining"
          stats={Number(data[0]?.total_collection_remaining || 0)}
          amount={
            Number(data[0]?.total_collection_remaining_amount || 0) -
            Number(data[0]?.return_amount || 0)
          }
          icon={<HandCoins className="size-4" />}
          isDown
        />
        <Card
          paramString="cd"
          name="Collection Done"
          stats={
            Number(data[0]?.total_collection || 0) -
            Number(data[0]?.total_due || 0)
          }
          amount={
            Number(data[0]?.collection_amount || 0) -
            Number(data[0]?.total_due_amount || 0)
          }
          icon={<Handshake className="size-4" />}
        />
        <Card
          paramString="r"
          name="Returned"
          stats={Number(data[0]?.total_return || 0)}
          amount={Number(data[0]?.return_amount || 0)}
          icon={<PackageMinus className="size-4" />}
          isDown
        />
      </div>
    </section>
  );
}
