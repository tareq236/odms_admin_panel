import db from "../../../db/db";
import {formateDateDB} from '@/lib/formatters'

export const getAttendance = async ({
  searchParams,
  limit = 20,
}: {
  searchParams: { q: string; p: string; start: string };
  limit?: number;
}) => {
  let data;

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
      data = await db.$queryRaw`
      SELECT ra.*, ru.full_name, COUNT(*) OVER() count FROM rdl_attendance ra 
      INNER JOIN rdl_user_list ru ON ru.sap_id = ra.sap_id
      WHERE ra.start_date_time >= ${formateDateDB(startDate)} AND ra.start_date_time < ${formateDateDB(endDate)}
      AND ra.sap_id = ${searchParams.q}
      LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
    `;
    } else {
      data = await db.$queryRaw`
      SELECT ra.*, ru.full_name, COUNT(*) OVER() count FROM rdl_attendance ra 
      INNER JOIN rdl_user_list ru ON ru.sap_id = ra.sap_id
      WHERE ra.start_date_time >= ${formateDateDB(startDate)} AND ra.start_date_time < ${formateDateDB(endDate)}
      LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
    `;
    }
  } catch (error) {}

  return data as any[];
};
