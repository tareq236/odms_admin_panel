import React from "react";
import Select from "../select/Select";
import db from "../../../db/db";

export default async function SelectDepotDA({
  depotCode,
}: {
  depotCode?: string;
}) {
  const users = await db.rdl_users_list.findMany({
    where: {
      depot_code: depotCode ?? "0000",
    },
    orderBy: {
      full_name: "asc",
    },
  });

  const data = users.map((item) => {
    return {
      label: `${item.full_name} (${item.sap_id})`,
      value: item.sap_id.toString(),
    };
  });
  return (
    <Select paramName="da_id" placeholder="Select DA" data={data as any[]} />
  );
}
