import { rdl_conveyance } from "@prisma/client";
import db from "../../../../../../db/db";

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
  let data;
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
    startDate.getDate() + 1,
  );

  try {
    if (searchParams.q) {
      [data, count] = await Promise.all([
        db.$queryRaw`
            SELECT rc.*, rul.full_name 
            FROM rdl_conveyance rc
            INNER JOIN rdl_user_list rul ON rc.da_code = rul.sap_id
            WHERE rc.da_code = '50009' 
            AND rc.created_at >= ${startDate} AND rc.created_at < ${endDate}
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
      throw new Error("Enter DA code");
    }
  } catch (error) {
    data = [] as rdl_conveyance[];
    count = 0;
    console.log(error);
    connectionError = true;
  }

  return { data, count, connectionError };
};
