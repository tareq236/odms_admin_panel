"use server";

import { z } from "zod";
import db from "../../../db/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/prisma/generated/client1";
import { notFound, redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { deleteSession } from "@/lib/session";

const addSchema = z.object({
  route: z.string().min(1).max(6),
  description: z.string().min(1),
  depotCode: z.string().min(1),
  depotName: z.string().min(1),
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
      data: {
        route: data.route,
        description: data.description,
      },
    });

    await db.rdl_route_wise_depot.create({
      data: {
        route_code: data.route,
        route_name: data.description,
        depot_code: data.depotCode,
        depot_name: data.depotName,
      },
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

  try {
    await db.rdl_route_sap.upsert({
      where: { route: data.route },
      create: {
        route: data.route,
        description: data.description,
      },
      update: {
        route: data.route,
        description: data.description,
      },
    });

    await db.rdl_route_wise_depot.update({
      where: {
        id: Number(id),
      },
      data: {
        depot_code: data.depotCode,
        depot_name: data.depotName,
        route_code: data.route,
        route_name: data.description,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/route");

    return {
      error: null,
      success: "Route is updated",
      toast: null,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          toast: "Route is already exist",
        };
      }
    }
    return {
      error: null,
      success: null,
      toast: (error as any).message.split("\n").pop() || (error as any).message,
    };
  }
};

export const deleteRoute = async (id: number) => {
  const auth = await verifySession();
  if (!auth.isAuth) {
    deleteSession();
    redirect("/login");
  }

  const route = await db.rdl_route_wise_depot.findUnique({ where: { id } });

  if (route == null) return notFound();

  await db.rdl_route_wise_depot.delete({ where: { id } });
  await db.rdl_route_sap.delete({ where: { route: String(route.route_code) } });

  revalidatePath("/admin");
  revalidatePath("/admin/route");
};
