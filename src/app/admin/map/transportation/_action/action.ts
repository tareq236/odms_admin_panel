import { rdl_conveyance } from "@/prisma/generated/client1";
import db from "../../../../../../db/db";
import { getUser, verifyAuthuser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { formateDateDB } from "@/lib/formatters";
import { hasDepotDa, odmsPanelAdminPermission } from "@/lib/permissions";

export const getConveyanceData = async ({
  searchParams,
  limit = 20,
}: {
  searchParams: {
    p: string;
    q: string;
    start: string;
  };
  limit?: number;
}) => {
  let data: any[] | unknown = [];
  let connectionError = false;

  const user = await verifyAuthuser();

  if (!user) redirect("/login");

  const isDepotDA = await hasDepotDa(searchParams.q, user.depot as string);

  try {
    if (
      odmsPanelAdminPermission(user) ||
      (isDepotDA && isDepotDA.length > 0 && searchParams.q)
    ) {
      data = await db.$queryRaw`
            select rc.*, ru.* from rdl_conveyance rc
            INNER JOIN rdl_users_list ru ON ru.sap_id=rc.da_code
            where DATE(rc.created_at) = ${
              searchParams.start
                ? searchParams.start
                : formateDateDB(new Date())
            }
            AND rc.da_code = ${searchParams.q || 0}
        `;
    } else {
      data = [];
      connectionError = false;
    }
  } catch (error) {
    data = [] as rdl_conveyance[];
    console.log(error);
    connectionError = true;
  }

  return { data, connectionError };
};
