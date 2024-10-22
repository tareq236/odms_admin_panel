import { formateDateDB } from "@/lib/formatters";
import db from "../../../../../../db/db";

export const getReturnData = async (searchParams: {
  q: string;
  start: string;
}) => {

  let partners: (unknown | any)[];

  try {
    partners = await db.$queryRaw`
    SELECT DISTINCT rl.partner
    FROM rdl_return_list rl
    where rl.da_code = ${Number(searchParams.q) || 0} AND rl.billing_date=${
      searchParams.start
        ? `${searchParams.start}`
        : `${formateDateDB(new Date())}`
    }
    `;
  } catch (error) {
    partners = [];
  }

  let returnProducts;
  try {
    returnProducts = await db.$queryRaw`
      select  rl.matnr, rm.material_name, rl.batch, 
      SUM(rl.return_quantity) quantity, SUM(rl.return_net_val) net_val, 
      rl.billing_doc_no, rl.partner, rc.name1
      from rdl_return_list rl
      INNER JOIN rpl_material rm ON rm.matnr=rl.matnr
      INNER JOIN rpl_customer rc on rc.partner=rl.partner
      where rl.da_code = ${Number(searchParams.q) || 0} AND rl.billing_date=${
      searchParams.start
        ? `${searchParams.start}`
        : `${formateDateDB(new Date())}`
    }
      GROUP BY rl.matnr
      ORDER BY rm.material_name
  `;
  } catch (error) {
    returnProducts = [];
  }

  // single billings
  let singleBills: any[] = [];
  try {
    for (let i = 0; i < partners.length; i++) {
      let data = await db.$queryRaw`
        select  rl.matnr, rm.material_name, rl.batch, 
        SUM(rl.return_quantity) quantity, SUM(rl.return_net_val) net_val, 
        rl.billing_doc_no, rl.partner, rc.name1
        from rdl_return_list rl
        INNER JOIN rpl_material rm ON rm.matnr=rl.matnr
        INNER JOIN rpl_customer rc on rc.partner=rl.partner
        where rl.da_code = ${
          Number(searchParams.q) || 0
        } AND rl.billing_date=${
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
  } catch (error) {
    singleBills = [];
  }

  return {
    singleBills,
    partners,
    returnProducts,
  };
};
