import db from "../../../db/db";

export const getAttendance = async ({
  searchParams,
  limit = 20,
}: {
  searchParams: { q: string; p: string; start: string; end: string };
  limit?: number;
}) => {
  let data;
  let count;
  let endDate = new Date(searchParams.end as string);

  if (searchParams.end && searchParams.q) {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        where: {
          AND: [
            {
              start_date_time: {
                gte: new Date(searchParams.start),
                lte: new Date(
                  endDate.getFullYear(),
                  endDate.getMonth(),
                  endDate.getDate() + 1,
                ),
              },
            },
            {
              sap_id: Number(searchParams.q) || null,
            },
          ],
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count({
        where: {
          AND: [
            {
              start_date_time: {
                gte: new Date(searchParams.start),
                lte: new Date(
                  endDate.getFullYear(),
                  endDate.getMonth(),
                  endDate.getDate() + 1,
                ),
              },
            },
            {
              sap_id: Number(searchParams.q) || null,
            },
          ],
        },
      }),
    ]);
  } else if (searchParams.end) {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        where: {
          start_date_time: {
            gte: new Date(searchParams.start),
            lte: new Date(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDate() + 1,
            ),
          },
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count({
        where: {
          start_date_time: {
            gte: new Date(searchParams.start),
            lte: new Date(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDate() + 1,
            ),
          },
        },
      }),
    ]);
  } else if (searchParams.q) {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        where: { sap_id: Number(searchParams.q) || null },
        orderBy: { created_at: "desc" },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count({
        where: { sap_id: Number(searchParams.q) || null },
      }),
    ]);
  } else {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        orderBy: { created_at: "desc" },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count(),
    ]);
  }

  return {data, count}
};
