import React from "react";
import Select from "../select/Select";
import db from "../../../db/db";

export default async function SelectDepot() {
  const depot = await db.rdl_route_wise_depot.findMany({
    distinct: 'depot_code',
    orderBy: {
        depot_name: 'asc'
    }
  });

  const data = depot.map((item) => {
    return {
      label: `${item.depot_name} (${item.depot_code})`,
      value: item.depot_code,
    };
  });
  return <Select paramName="depot" placeholder="Select Depot" data={data as any[]} />;
}
