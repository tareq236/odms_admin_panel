import { formateDateDB } from "@/lib/formatters";
import { NextRequest } from "next/server";
import db2 from "../../../../../db/db2";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const daCode = Number(searchParams.get("q"));
    const qDate = `${
      searchParams.has("start")
        ? searchParams.get("start")
        : formateDateDB(new Date())
    }`;

    const data = await db2.$queryRaw`
        SELECT * FROM user_movement_dev WHERE user_id='50999' AND mv_date='2024-03-18'
    `;

    return Response.json(data);
  } catch (error: any) {
    return Response.json({
      error: error.message,
    });
  }
}
