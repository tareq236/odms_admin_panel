import React from "react";
import db from "../../../db/db";
import { Combobox } from "../combobox/Combobox";

export default async function SelectDepot() {
  const depot = await db.rdl_route_wise_depot.findMany({
    distinct: "depot_code",
    orderBy: {
      depot_name: "asc",
    },
  });

  const data = depot.map((item) => {
    return {
      label: `${item.depot_name} (${item.depot_code})`,
      value: item.depot_code,
    };
  });
  return (
    <>
      <Combobox
        paramName="depot"
        placeholder="Select Depot"
        data={data as any[]}
      />
    </>
  );
}
