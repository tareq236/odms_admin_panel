"use server";

import { FetchApiJSON } from "@/lib/helper";
import { revalidatePath } from "next/cache";

const expiredAPI = new FetchApiJSON();
expiredAPI.setBaseUrl(process.env.NEXT_PUBLIC_EXPIRED_PRODUCT_API as string);

export const getWithdrawalPendingList = async ({
  depotCode,
  daId,
}: {
  depotCode: string;
  daId?: string;
}) => {
  try {
    // create search params
    const params = new URLSearchParams();

    params.set("status", "request_approved");

    if (depotCode) {
      params.set("depot_id", depotCode);
    }

    if (daId) {
      params.set("da_id", daId);
    }

    // fetch data
    const res = await expiredAPI.fetchData(
      `/api/v1/withdrawal/request/list?${params.toString()}`
    );

    return {
      success: true,
      data: res.data,
      message: "Data get successful",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: [],
      message: "Something went wrong",
    };
  }
};

export const getWithdrawalConfirmationList = async ({
  daId,
}: {
  daId?: string;
}) => {
  try {
    // create search params
    const params = new URLSearchParams();

    params.set("status", "all");

    params.set("mio_id", "10001");

    // fetch data
    const res = await expiredAPI.fetchData(
      `/api/v1/withdrawal/list?mio_id=10001&status=all`
    );

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
