"use server";

import { revalidatePath } from "next/cache";
import { expiredAPI } from "./api";

export const getRequestList = async (searchParams: any) => {
  try {
    // create search params
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams as Object).filter(
          ([_, v]) => v != null && v !== ""
        ) // remove null, undefined, empty string
      )
    );

    let apiUrl = `/api/v1/withdrawal/request/list`;

    if (
      ["withdrawal_approval", "withdrawal_approved"].includes(
        searchParams.status
      )
    ) {
      apiUrl = `/api/v1/withdrawal/final_list`;
    }

    console.log("PARAMS ", params.toString());

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

export const confirmWithdrawal = async ({
  invoiceNo,
}: {
  invoiceNo: string;
}) => {
  try {
    // fetch data
    const res = await expiredAPI.fetchData(`/api/v1/withdrawal/confirmation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoice_no: invoiceNo,
      }),
    });

    revalidatePath("/admin/expired-products/request-list");

    return {
      success: true,
      data: res,
      message: "Withdrawal is confirmed successfully",
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
