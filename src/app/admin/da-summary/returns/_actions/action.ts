import { formateDateDB } from "@/lib/formatters";
import db from "../../../../../../db/db";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export const getReturnData = async (searchParams: {
  q: string;
  start: string;
}) => {
  const startDate = searchParams.start
    ? `${searchParams.start}`
    : `${formateDateDB(new Date())}`;

  const daCode = Number(searchParams.q) || 0;

  let partners: (unknown | any)[] = [];

  const user = await getUser();

  if (!user) redirect("/login");

  const isDepotDA: any = await db.$queryRaw`
    select count(*) over () as total
    from
        rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
    WHERE
        a.billing_date = ${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        }
        AND a.da_code = ${Number(searchParams.q) || 0}
        AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
                depot_code =${user.depot_code}
        )
  `;

  try {
    if (user.role == "admin" || (isDepotDA && isDepotDA.length > 0)) {
      partners = await db.$queryRaw`
    SELECT DISTINCT rl.partner
    FROM rdl_return_list rl
    where rl.da_code = ${daCode} AND rl.billing_date=${startDate}
    `;
    }
  } catch (error) {
    partners = [];
  }

  let returnProducts: any[] = [];
  try {
    if (user.role == "admin" || (isDepotDA && isDepotDA.length > 0)) {
      returnProducts = await db.$queryRaw`
      select  rl.matnr, rm.material_name, rl.batch, 
      SUM(rl.return_quantity) quantity, SUM(rl.return_net_val) net_val, 
      rl.billing_doc_no, rl.partner, rc.name1, rc.street, rc.district
      from rdl_return_list rl
      INNER JOIN rpl_material rm ON rm.matnr=rl.matnr
      INNER JOIN rpl_customer rc on rc.partner=rl.partner
      where rl.da_code = ${daCode} AND rl.billing_date=${startDate}
      GROUP BY rl.matnr
      ORDER BY rm.material_name
  `;
    }
  } catch (error) {
    returnProducts = [];
  }

  // single billings
  let singleBills: any[] = [];
  try {
    if (user.role == "admin" || (isDepotDA && isDepotDA.length > 0)) {
      for (let i = 0; i < partners.length; i++) {
        let data = await db.$queryRaw`
        select  rl.matnr, rm.material_name, rl.batch, 
        SUM(rl.return_quantity) quantity, SUM(rl.return_net_val) net_val, 
        rl.billing_doc_no, rl.partner, rc.name1, rc.street, rc.district
        from rdl_return_list rl
        INNER JOIN rpl_material rm ON rm.matnr=rl.matnr
        INNER JOIN rpl_customer rc on rc.partner=rl.partner
        where rl.da_code = ${Number(searchParams.q) || 0} AND rl.billing_date=${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        } 
        AND rl.partner=${partners[i].partner}
        GROUP BY rl.matnr
        ORDER BY rm.material_name
      `;

        singleBills.push(data);
      }
    }
  } catch (error) {
    singleBills = [];
  }

  return {
    singleBills,
    partners,
    returnProducts,
  };
};
