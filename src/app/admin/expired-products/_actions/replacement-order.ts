"use server";

import { revalidatePath } from "next/cache";
import { expiredAPI } from "./api";

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

    if (params.get("status") === "delivery_pending_list") {
      apiUrl = `/api/v1/replacement/delivery_pending_list`;
    }

    if (params.get("status") === "delivered_list") {
      apiUrl = `/api/v1/replacement/delivered_list`;
    }

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
    const res = await expiredAPI.fetchData(`/api/v1/replacement/assign_delivery_da`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delivery_da_id: daId,
        invoice_no: invoiceNo,
      }),
    });

    revalidatePath("/admin/expired-products/replacement-order");

    return {
      success: true,
      data: res,
      message: "Assign DA successfully",
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
