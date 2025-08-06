"use server";

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
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_EXPIRED_PRODUCT_API
      }/api/v1/withdrawal/request/list?${params.toString()}`
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
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_EXPIRED_PRODUCT_API
      }/api/v1/withdrawal/list?mio_id=10001&status=all`
    );
    const data = await res.json();

    if (!res.ok) throw Error(data);

    console.log(data)

    return {
      success: true,
      data: data,
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
