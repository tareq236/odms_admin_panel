import db from "../../../db/db";

export const getAttendance = async ({
  searchParams,
  limit = 20,
}: {
  searchParams: { q: string; p: string; start: string };
  limit?: number;
}) => {
  let data;
  let count;
  let startDate =
    searchParams.start == undefined ? new Date() : new Date(searchParams.start);


  if (searchParams.start && searchParams.q) {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        where: {
          AND: [
            {
              start_date_time: {
                equals: startDate,
                lte: new Date(
                  startDate.getFullYear(),
                  startDate.getMonth(),
                  startDate.getDate() + 1,
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
                gte: startDate,
                lte: new Date(
                  startDate.getFullYear(),
                  startDate.getMonth(),
                  startDate.getDate() + 1,
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
  } else if (searchParams.start) {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        where: {
          start_date_time: {
            gte: startDate,
            lte: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 1,
            ),
          },
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count({
        where: {
          start_date_time: {
            gte: startDate,
            lte: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 1,
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
  } else  {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        where: {
          start_date_time: {
            gte: startDate,
            lte: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 1,
            ),
          },
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count({
        where: {
          start_date_time: {
            gte: new Date(),
            lte: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + 1,
            ),
          },
        },
      }),
    ]);
  }

  return { data, count };
};
