import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "./session";
import db from "../../db/db";
import { cache } from "react";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  const user = await db.rdl_admin_user_list.findUnique({
    where: { id: Number(session.userId) || 0 },
  });

  if (user == null) {
    return { isAuth: false, userId: null }
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.rdl_admin_user_list.findUnique({
      where: { id: Number(session.userId) },
      select: {
        id: true,
        full_name: true,
      },
    });

    const user = data;

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
