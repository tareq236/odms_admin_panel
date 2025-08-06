"use server";

import db from "../../../../../db/db";

const getDaData = async ({
  depotCode,
  search,
}: {
  depotCode: string;
  search?: string;
}) => {
  try {
    const users = await db.rdl_users_list.findMany({
      where: {
        depot_code: depotCode ?? "0000",
        ...(search && {
          OR: [
            {
              sap_id: Number(search),
            },
            {
              full_name: {
                startsWith: search,
              },
            },
          ],
        }),
      },
      orderBy: {
        full_name: "asc",
      },
      take: 5,
    });

    return {
      data: users,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      success: false,
      error: (error as Error).message,
    };
  }
};

export { getDaData };
