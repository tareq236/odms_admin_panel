"use server";

import { z } from "zod";
import db from "../../../db/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { deleteSession } from "@/lib/session";

const addSchema = z.object({
  route: z.string().min(1).max(6),
  description: z.string().min(1),
});

export const createRoute = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      success: null,
      toast: null,
    };
  }

  const data = result.data;

  const route = await db.rdl_route_sap.findUnique({
    where: { route: data.route },
  });

  if (route != null) {
    return {
      error: null,
      success: null,
      toast: "Route is alreay exist",
    };
  }

  const auth = await verifySession();
  if (!auth.isAuth) {
    deleteSession();
    redirect("/login");
  }

  try {
    await db.rdl_route_sap.create({
      data: { ...data },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/route");

    return {
      error: null,
      success: "Route is added",
      toast: null,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateRoute = async (
  id: string,
  prevState: unknown,
  formData: FormData,
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

  const route = await db.rdl_route_sap.findUnique({
    where: { route: id },
  });

  if (route == null) {
    return {
      error: null,
      success: null,
      toast: "Route is not found",
    };
  }

  try {
    await db.rdl_route_sap.update({
      where: { route: id },
      data: { ...data, updated_at: new Date() },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/route");

    return {
      error: null,
      success: "Route is updated",
      toast: null,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          toast: "Route is already exist",
        };
      }
    }
  }
};

export const deleteRoute = async (id: string) => {
  const auth = await verifySession();
  if (!auth.isAuth) {
    deleteSession();
    redirect("/login");
  }

  const route = await db.rdl_route_sap.findUnique({ where: { route: id } });

  if (route == null) return notFound();

  await db.rdl_route_sap.delete({ where: { route: id } });

  revalidatePath("/admin");
  revalidatePath("/admin/route");
};
