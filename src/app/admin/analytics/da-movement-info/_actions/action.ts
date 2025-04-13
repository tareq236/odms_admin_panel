import { formateDateDB } from "@/lib/formatters";
import db from "../../../../../../db/db";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export const getDaMovementInfoData = async (
  searchParams: {
    p: string;
    q: string;
    filter?: string;
    start: string;
    end: string;
  },
  limit: number = 20
) => {
  let resCount: any | unknown;
  let count = 0;
  let data: any[] | unknown = [];
  let connectionError = false;

  resCount = [{ total: 0 }];

  const currentDate = new Date();
  const queryDate =
    searchParams.filter === "m"
      ? new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate() - 1
        )
      : searchParams.filter === "w"
      ? new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 8
        )
      : new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 1
        );
  const dateStart = searchParams.start || formateDateDB(queryDate);

  const dateEnd =
    searchParams.end ||
    formateDateDB(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )
    );

  const authUser = await getUser();

  if (!authUser) return redirect("/login");

  try {
    if (authUser.role === "admin") {
      if (searchParams.start || searchParams.filter) {
        if (searchParams.q) {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
              SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
              WHERE rdm.da_code = ${searchParams.q || ""} AND
              rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
              LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,
            db.$queryRaw`
           SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
           WHERE rdm.da_code = ${searchParams.q || ""} AND
              rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
         `,
          ]);
        } else {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
              SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
              WHERE rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
              LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,
            db.$queryRaw`
            SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
            WHERE rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
          `,
          ]);
        }
      } else {
        if (searchParams.q) {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
              SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
              WHERE rdm.da_code = ${searchParams.q || ""}
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
              LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,
            db.$queryRaw`
           SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
           WHERE rdm.da_code = ${searchParams.q || ""}
         `,
          ]);
        } else {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
              SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
              LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,
            db.$queryRaw`
            SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
          `,
          ]);
        }
      }
    } else {
      if (searchParams.start || searchParams.filter) {
        if (searchParams.q) {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
                SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
                INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
                WHERE rdm.da_code = ${searchParams.q || ""} AND
                rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
                AND rul.depot_code=${authUser.depot_code}
                ORDER BY rdm.mv_date DESC, rdm.da_code ASC
                LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
                `,
            db.$queryRaw`
             SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
             INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
             WHERE rdm.da_code = ${searchParams.q || ""} AND
                rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
                AND rul.depot_code=${authUser.depot_code}
           `,
          ]);
        } else {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
                SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
                INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
                WHERE rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
                AND rul.depot_code=${authUser.depot_code}
                ORDER BY rdm.mv_date DESC, rdm.da_code ASC
                LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
                `,
            db.$queryRaw`
              SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
              INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
              WHERE rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
              AND rul.depot_code=${authUser.depot_code}
            `,
          ]);
        }
      } else {
        if (searchParams.q) {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
                SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
                INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
                WHERE rdm.da_code = ${searchParams.q || ""}
                AND rul.depot_code=${authUser.depot_code}
                ORDER BY rdm.mv_date DESC, rdm.da_code ASC
                LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
                `,
            db.$queryRaw`
             SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
             INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
             WHERE rdm.da_code = ${searchParams.q || ""}
                AND rul.depot_code=${authUser.depot_code}
           `,
          ]);
        } else {
          [data, resCount] = await Promise.all([
            db.$queryRaw`
                SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
                INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
                WHERE rul.depot_code=${authUser.depot_code}
                ORDER BY rdm.mv_date DESC, rdm.da_code ASC
                LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
                `,
            db.$queryRaw`
              SELECT COUNT(rdm.da_code) as total FROM rdl_da_movement rdm 
              INNER JOIN rdl_users_list rul ON rul.sap_id = rdm.da_code
              WHERE rul.depot_code=${authUser.depot_code}
            `,
          ]);
        }
      }
    }

    count = Number(resCount[0]?.total);
  } catch (error) {
    data = [] as any[];
    connectionError = true;
    console.log(error);
    count = 0;
  }

  return { data, count, connectionError };
};
