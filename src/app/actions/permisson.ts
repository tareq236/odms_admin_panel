"use server";

import { verifyAuthuser } from "@/lib/dal";
import { redirect } from "next/navigation";
import db from "../../../db/db";

export const getPermission = async (userId?: string | number) => {
  try {
    const authUser = await verifyAuthuser();

    if (!authUser) redirect("/login");

    if (authUser.role === "depot" && userId) {
      const user = await db.rdl_users_list.findFirst({
        where: {
          sap_id: Number(userId),
        },
      });

      if (user?.depot_code !== authUser.depot) return false;
      return true;
    }

    if (["admin", "admin_odms"].includes(authUser.role as string)) return true;

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
