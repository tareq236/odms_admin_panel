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
  let date = searchParams.start ? searchParams.start.split("-") : undefined;
  let startDate =
    date == undefined ? new Date() : new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

  let endDate = new Date(startDate.getFullYear(),startDate.getMonth(), startDate.getDate() + 1, 
  );

  if (searchParams.start && searchParams.q) {
    [data, count] = await Promise.all([
      db.rdl_attendance.findMany({
        include: { rdl_user_list: true },
        where: {
          AND: [
            {
              start_date_time: {
                gte: startDate,
                lt: endDate,
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
                lt: endDate,
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
            lt: endDate,
          },
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count({
        where: {
          start_date_time: {
            gte: startDate,
            lt: endDate,
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
        where: {
          start_date_time: {
            gte: startDate,
            lt: endDate,
          },
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_attendance.count({
        where: {
          start_date_time: {
            gte: startDate,
            lt: endDate,
          },
        },
      }),
    ]);
  }

  return { data, count };
};

