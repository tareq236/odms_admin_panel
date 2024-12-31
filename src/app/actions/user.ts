"use server";

import { z } from "zod";
import db from "../../../db/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/prisma/generated/client1";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { deleteSession } from "@/lib/session";

const addSchema = z.object({
  sap_id: z.string().min(1),
  full_name: z.string().min(1),
  mobile_number: z.string().min(11),
  password: z.string().min(6),
  status: z.string().min(1),
  user_type: z.string().optional(),
});

export const createUser = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      success: null,
      toast: null,
    };
  }

  const data = result.data;

  const user = await db.rdl_user_list.findUnique({
    where: { sap_id: Number(data.sap_id) },
  });

  if (user != null) {
    return {
      error: null,
      success: null,
      toast: "SAP ID is alreay exist",
    };
  }

  const auth = await verifySession();
  if (!auth.isAuth) {
    deleteSession();
    redirect("/login");
  }

  try {
    await db.rdl_users_list.create({
      data: {
        sap_id: Number(data.sap_id),
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        status: Number(data.status),
        password: data.password,
        user_type: data.user_type,
        updated_at: new Date(),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/user/management");

    return {
      error: null,
      success: "User is added",
      toast: null,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  id: number,
  prevState: unknown,
  formData: FormData
) => {
  const auth = await verifySession();
  if (!auth.isAuth) {
    deleteSession();
    redirect("/login");
  }

  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      success: null,
      toast: null,
    };
  }

  const data = result.data;

  const user = await db.rdl_users_list.findUnique({
    where: { sap_id: Number(data.sap_id) },
  });

  if (user == null) {
    return {
      error: null,
      success: null,
      toast: "User is not found",
    };
  }

  try {
    await db.rdl_users_list.update({
      where: { sap_id: id },
      data: {
        sap_id: Number(data.sap_id),
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        status: Number(data.status),
        password: data.password,
        user_type: data.user_type,
        updated_at: new Date(),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/user/management");

    return {
      error: null,
      success: "User is updated",
      toast: null,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          toast: "SAP ID is already exist",
        };
      }
    }
  }
};

export const deleteUser = async (id: number) => {
  const auth = await verifySession();
  if (!auth.isAuth) {
    deleteSession();
    redirect("/login");
  }

  const user = await db.rdl_users_list.findUnique({ where: { sap_id: id } });

  if (user == null) throw new Error("User is not found");

  await db.rdl_users_list.delete({ where: { sap_id: id } });

  revalidatePath("/admin");
  revalidatePath("/admin/user/management");
};
