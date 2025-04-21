import { NextRequest } from "next/server";
import db from "../../../../db/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const daCode = (searchParams.get("q"));
    const depot = (searchParams.get("depot"));

    const data = await db.$queryRaw`
        SELECT * 
        FROM rdl_users_list
        WHERE depot_code=${depot} AND sap_id=${daCode}
    `;

    console.log(data)

    if (data && (data as any[]).length === 0)
      throw new Error("Not a depot user");

    return Response.json({ sucess: data });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 404,
      }
    );
  }
}
