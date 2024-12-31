"use server";

import { z } from "zod";
import db from "../../../../../../db/db";
import * as XLSX from "xlsx";
import { rdl_users_list } from "@/prisma/generated/client1";
import { revalidatePath } from "next/cache";

const addSchema = z.object({
  upload: z
    .instanceof(File, { message: "Required" })
    .refine(
      (file) =>
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      {
        message: "Only xlsx, xls file acceptable",
      }
    ),
});

export const bulkUploadUser = async (prevData: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      success: null,
      toast: null,
    };
  }

  const upload = result.data;

  console.log(upload);

  try {
    // Read the Excel file as binary
    const workbook = XLSX.read(Buffer.from(await upload.upload.arrayBuffer()), {
      type: "buffer",
    });

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];

    // Get the data from the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON format
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    console.log(jsonData);

    const importData = jsonData.map((item: any) => {
      return {
        ...item,
        mobile_number: `${item.mobile_number}`,
        password: item?.password ?? "123456",
        status: item?.status ?? 1,
        created_at: item.created_at ?? new Date(),
        updated_at: item.created_at ?? new Date()
      };
    });
    console.log(importData);

    await db.rdl_users_list.createMany({
      data: importData as rdl_users_list[],
    });


    revalidatePath('/admin/user/management')

    return {
      error: null,
      success: "Users is added",
      toast: null,
    };
  } catch (error: any) {
    return {
      error: null,
      success: null,
      toast: error.message.split("\n").pop(),
    };
  }
};
