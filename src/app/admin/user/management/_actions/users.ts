"use server";

import { rdl_users_list } from "@/prisma/generated/client1";
import db from "../../../../../../db/db";

export const getUsers = async ({
  searchParams,
  limit,
}: {
  searchParams: any;
  limit: number;
}) => {
  try {
    const [data, count] = await Promise.all([
      db.rdl_users_list.findMany({
        where: {
          ...(searchParams.q && {
            OR: [
              { full_name: { contains: searchParams.q } },
              { mobile_number: { startsWith: searchParams.q } },
              { sap_id: Number(searchParams.q) || 0 },
            ],
          }),
        },
        orderBy: {
          created_at: "desc",
        },
        take: limit,
        skip: limit * (Number(searchParams.p || 1) - 1),
      }),
      db.rdl_users_list.count({
        where: {
          ...(searchParams.q && {
            OR: [
              { full_name: { contains: searchParams.q } },
              { mobile_number: { startsWith: searchParams.q } },
              { sap_id: Number(searchParams.q) || 0 },
            ],
          }),
        },
      }),
    ]);

    return { data, count };
  } catch (error) {
    const data: rdl_users_list[] = [];
    const count = 0;
    console.error(error);
    return { data, count, error: (error as any).message.split("\n").pop() };
  }
};
