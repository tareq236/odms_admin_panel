"use server";

import { SearchParams } from "@/types/params";

export const getRequestList = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  try {
    const res = await fetch(
      `http://103.168.140.132:5001/api/v1/withdrawal/request/list?depot_id=RD33&status=request_approved`
    );
    const data = await res.json();

    if (!res.ok) throw Error(data);

    return {
      success: true,
      data: data.data,
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
