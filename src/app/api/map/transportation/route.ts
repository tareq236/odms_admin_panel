import { formateDateDB } from "@/lib/formatters";
import { NextRequest } from "next/server";
import db2 from "../../../../../db/db2";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const daCode = (searchParams.get("q") || "");
    const qDate = `${
      searchParams.has("start")
        ? searchParams.get("start")
        : formateDateDB(new Date())
    }`;
    const startTime =`${searchParams.get("start_time") || "00:00"}`
    const endTime =`${searchParams.get("end_time") || "23:59"}`

    const data = await db2.$queryRaw`
        SELECT latitude, longitude, mv_time
        FROM user_movement
        WHERE user_id = ${daCode} AND mv_date =${qDate}::DATE 
        AND mv_time BETWEEN ${startTime}::TIME AND ${endTime}::TIME
        ORDER BY mv_time
    `;

    return Response.json(data);
  } catch (error: any) {
    return Response.json({
      error: error.message,
    },{status: 400});
  }
}
