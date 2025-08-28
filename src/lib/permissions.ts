"use server";

import { rdl_admin_user_list_role } from "@/prisma/generated/client1";
import db from "../../db/db";
import { AuthUser } from "@/types/AuthUser";

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

const odmsPanelAdminPermission = (user: AuthUser) => {
  try {
    return (["admin", "admin_odms"] as rdl_admin_user_list_role[]).includes(
      user.role as rdl_admin_user_list_role
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

const expiredPanelAdminPermission = (user: AuthUser) => {
  try {
    return (["admin", "admin_expr"] as rdl_admin_user_list_role[]).includes(
      user.role as rdl_admin_user_list_role
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { hasDepotDa, odmsPanelAdminPermission, expiredPanelAdminPermission };
