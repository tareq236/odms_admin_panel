import { NextRequest } from "next/server";
import db from "../../../../db/db";
import { formateDateDB } from "@/lib/formatters";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const currentDate = new Date();
  const queryDate =
    searchParams.get("filter") === "m"
      ? new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate() - 1
        )
      : searchParams.get("filter") === "w"
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
  const dateStart = searchParams.get("start") || formateDateDB(queryDate);

  const dateEnd =
    searchParams.get("end") ||
    formateDateDB(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )
    );

  let data: any[] | unknown;

  try {
    if (searchParams.has("filter") || searchParams.has("start")) {
      if (searchParams.has("q")) {
        data = await db.$queryRaw`
          SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_user_list rul ON rul.sap_id = rdm.da_code
              WHERE rdm.da_code = ${searchParams.get("q") || ""} AND
              rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
        `;
      } else {
        data = await db.$queryRaw`
          SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_user_list rul ON rul.sap_id = rdm.da_code
              WHERE rdm.mv_date >= ${dateStart} AND rdm.mv_date < ${dateEnd}
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
        `;
      }
    } else {
      if (searchParams.has("q")) {
        data = await db.$queryRaw`
          SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_user_list rul ON rul.sap_id = rdm.da_code
              WHERE rdm.da_code = ${searchParams.get("q") || ""}
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
              limit 100
        `;
      } else {
        data = await db.$queryRaw`
          SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, (rdm.mv_time_minutes / 60) mv_time_hours, rdm.mv_date FROM rdl_da_movement rdm 
              INNER JOIN rdl_user_list rul ON rul.sap_id = rdm.da_code
              ORDER BY rdm.mv_date DESC, rdm.da_code ASC
              limit 100
        `;
      }
    }

    return Response.json(data as any[]);
  } catch (error: any) {
    console.log(error);
    return Response.json({
      error: error.message,
    });
  }
}
