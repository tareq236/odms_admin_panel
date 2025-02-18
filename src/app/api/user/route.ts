import { NextRequest } from "next/server";
import db from "../../../../db/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const daCode = Number(searchParams.get("q"));

    const data = await db.rdl_users_list.findMany({
      where: {
        ...(daCode != 0 && {
          sap_id: daCode,
        }),
       
      },
      take: 10,
    });

    return Response.json(data);
  } catch (error: any) {
    console.log(error);
    return Response.json({
      error: error.message,
    });
  }
}
