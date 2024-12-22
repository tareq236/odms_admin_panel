import db from "../../../../../../db/db";

export const getDaMovementInfoData = async (
  searchParams: {
    p: string;
    q: string;
  },
  limit: number = 20
) => {
  let count = 0;
  let data: any[] | unknown = [];
  let connectionError = false;

  try {
    if (searchParams.q) {
      [data, count] = await Promise.all([
        db.$queryRaw`
            SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, rdm.mv_date FROM rdl_da_movement rdm 
            INNER JOIN rdl_user_list rul ON rul.sap_id = rdm.da_code
            WHERE rdm.da_code = ${searchParams.q || ""}
            ORDER BY rdm.mv_date DESC
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
        db.rdl_da_movement.count({
          where: {
            da_code: searchParams.q,
          },
        }),
      ]);
    } else {
      [data, count] = await Promise.all([
        db.$queryRaw`
            SELECT rdm.da_code, rul.full_name, rdm.mv_distance_km, rdm.mv_time_minutes, rdm.mv_date FROM rdl_da_movement rdm 
            INNER JOIN rdl_user_list rul ON rul.sap_id = rdm.da_code
            ORDER BY rdm.mv_date DESC
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
        db.rdl_da_movement.count(),
      ]);
    }
  } catch (error) {
    data = [] as any[];
    connectionError = true;
    console.log(error);
  }

  return { data, count, connectionError };
};
