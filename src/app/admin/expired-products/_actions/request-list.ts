"use server";

export const getRequestList = async ({
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
    const res = await fetch(
      `http://103.168.140.132:5001/api/v1/withdrawal/request/list?${params.toString()}`
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
