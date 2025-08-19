"use server";

import { FetchApiJSON } from "@/lib/helper";
import { revalidatePath } from "next/cache";

const expiredAPI = new FetchApiJSON();
expiredAPI.setBaseUrl(process.env.NEXT_PUBLIC_EXPIRED_PRODUCT_API as string);

export const getReplacementOrders = async (searchParams: any) => {
  try {
    // create search params
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams as Object).filter(
          ([_, v]) => v != null && v !== ""
        ) // remove null, undefined, empty string
      )
    );

    let apiUrl = `/api/v1/replacement/request/list`;

    // fetch data
    const res = await expiredAPI.fetchData(`${apiUrl}?${params.toString()}`);

    return {
      success: true,
      data: res,
      message: "Data get successful",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: [],
      error: (error as Error).message,
      message: "Something went wrong",
    };
  }
};

export const updateAssignDA = async ({
  daId,
  invoiceNo,
}: {
  daId: number;
  invoiceNo: number;
}) => {
  try {
    // fetch data
    const res = await expiredAPI.fetchData(`/api/v1/withdrawal/assign-da`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        da_id: daId,
        invoice_no: invoiceNo,
      }),
    });

    revalidatePath("/admin/expired-products/request-list");

    return {
      success: true,
      data: res,
      message: "Assign DA successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      message: (error as Error).message ?? "Something went wrong",
    };
  }
};
