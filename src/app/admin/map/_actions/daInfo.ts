"use server";

import db from "../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { AuthUserProps } from "../../route/page";
import { AuthUser } from "@/types/AuthUser";
import { hasDepotDa } from "@/lib/permissions";

export const getDaInfo = async ({
  searchParams,
  user,
}: {
  searchParams: { q: string; start: string; p: string };
  user: AuthUser;
}) => {
  let daInfo;
  try {
    daInfo = await db.rdl_users_list.findUnique({
      where: { sap_id: Number(searchParams.q || 0) },
    });
  } catch (error) {
    daInfo = null;
  }

  const isDepotDA: any = await hasDepotDa(searchParams.q, user.depot as string);

  return { daInfo, isDepotDA };
};
