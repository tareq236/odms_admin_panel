import { rdl_conveyance } from "@/prisma/generated/client1";
import db from "../../../../../../db/db";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { formateDateDB } from "@/lib/formatters";

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
  let count = 0;
  let connectionError = false;

  let date = searchParams.start ? searchParams.start.split("-") : undefined;
  let startDate =
    date == undefined
      ? new Date()
      : new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

  let endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 1
  );

  const user = await getUser();

  if (!user) redirect("/login");

  const isDepotDA: any = await db.$queryRaw`
    select count(*) over () as total
    from
        rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
    WHERE
        a.billing_date = ${startDate}
        AND a.da_code = ${Number(searchParams.q) || 0}
        AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
                depot_code =${user.depot_code}
        )
  `;

  try {
    if (
      user.role == "admin" ||
      (isDepotDA && isDepotDA.length > 0 && searchParams.q)
    ) {
      [data, count] = await Promise.all([
        db.$queryRaw`
            select rc.*, ru.full_name from rdl_conveyance rc
            INNER JOIN rdl_users_list ru ON ru.sap_id=rc.da_code
            where DATE(rc.created_at) = ${searchParams.start ? searchParams.start : formateDateDB(new Date())}
            AND rc.da_code = ${searchParams.q || 0}
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `,
        db.rdl_conveyance.count({
          where: {
            AND: [
              { da_code: searchParams?.q || "" },
              {
                created_at: {
                  gte: startDate,
                  lt: endDate,
                },
              },
            ],
          },
        }),
      ]);
    } else {
      data = [];
      connectionError = false;
    }
  } catch (error) {
    data = [] as rdl_conveyance[];
    count = 0;
    console.log(error);
    connectionError = true;
  }

  return { data, count, connectionError };
};
