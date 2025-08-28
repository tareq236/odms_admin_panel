import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "./session";
import db from "../../db/db";
import { AuthUser } from "@/types/AuthUser";

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  const user = await db.rdl_admin_user_list.findUnique({
    where: { id: Number(session.userId) || 0 },
  });

  if (user == null) {
    return { isAuth: false, userId: null };
  }

  return { isAuth: true, userId: session.userId };
};

export const getUser = async () => {
  try {
    const session = await verifySession();
    if (!session) return null;
    const data = await db.rdl_admin_user_list.findUnique({
      where: { id: Number(session.userId) },
      select: {
        id: true,
        full_name: true,
        depot_code: true,
        role: true,
      },
    });

    if (data == null) {
      throw new Error();
    }

    const user = data;

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};

export const verifyAuthuser: () => Promise<AuthUser | null> = async () => {
  try {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);

    const user = session;

    return user as AuthUser;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};
