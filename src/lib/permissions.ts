"use server";

import db from "../../db/db";

const hasDepotDa = async (daId: string, depotCode: string) => {
  let data: any = null;

  try {
    data = await db.$queryRaw`
    select count(*) over () as total
    from
        rdl_delivery_info_sap as a
    WHERE
       a.da_code = ${Number(daId) || 0}
        AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
                depot_code =${depotCode}
        )
  `;
  } catch (error) {
    console.error(error);
  }

  return data;
};

export { hasDepotDa };
