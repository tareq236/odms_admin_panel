import React from "react";
import Card from "./Card";
import {
  HandCoins,
  Handshake,
  Package2,
  PackageCheck,
  PackageMinus,
  Sigma,
  SquareSigma,
} from "lucide-react";

function CardSection() {
  return (
    <section>
      <h3 className="text-muted-foreground mb-3">Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 border-t border-l">
        <Card
          name="Delivery Remaining"
          stats={831}
          icon={<Package2 className="size-5" />}
        />
        <Card
          name="Delivery Done"
          stats={876}
          icon={<PackageCheck className="size-5" />}
        />
        <Card
          name="Collection Remainig"
          stats={876}
          icon={<HandCoins className="size-5" />}
        />
        <Card
          name="Collection Done"
          stats={0}
          icon={<Handshake className="size-5" />}
        />
        <Card
          name="Returned"
          stats={4}
          icon={<PackageMinus className="size-5" />}
        />
      </div>
    </section>
  );
}

export default CardSection;
