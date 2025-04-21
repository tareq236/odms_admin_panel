"use server";

import db from "../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { AuthUserProps } from "../../route/page";

export const getDaInfo = async ({
  searchParams,
  user,
}: {
  searchParams: { q: string; start: string; p: string };
  user: AuthUserProps;
}) => {
  let daInfo;
  try {
    daInfo = await db.rdl_users_list.findUnique({
      where: { sap_id: Number(searchParams.q || 0) },
    });
  } catch (error) {
    daInfo = null;
  }

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
                    depot_code =${user.depot_code}
            )
      `;

  return { daInfo, isDepotDA };
};
