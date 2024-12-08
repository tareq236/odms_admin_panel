import { getUser } from "@/lib/dal";
import db from "../../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { redirect } from "next/navigation";

export const getDueList = async (searchParams: {
  q: string;
  start: string;
}) => {
  let partners: (unknown | any)[] = [];

  const startDate = searchParams.start
    ? `${searchParams.start}`
    : `${formateDateDB(new Date())}`;

  const daCode = Number(searchParams.q) || 0;

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
                depot_code =${user.deport_code}
        )
  `;

  try {
    if (isDepotDA && isDepotDA.length > 0) {
      partners = await db.$queryRaw`
    select DISTINCT rd.partner 
    from rdl_delivery rd
    WHERE rd.billing_date=${startDate} 
    AND rd.da_code=${daCode} AND rd.due_amount > 0
    `;
    }
  } catch (error) {
    partners = [];
  }

  let partnerDues: any[] = [];

  try {
    if (isDepotDA && isDepotDA.length > 0) {
      for (let i = 0; i < partners.length; i++) {
        let data = await db.$queryRaw`
        select rd.billing_doc_no, 
        rd.partner, rc.name1, rc.street, rc.district, rd.due_amount, rd.net_val
        from rdl_delivery rd
        INNER JOIN rpl_customer rc ON rc.partner=rd.partner
        WHERE rd.billing_date=${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        } AND rd.da_code=${Number(searchParams.q) || 0} AND rd.due_amount > 0
        AND rd.partner=${partners[i].partner}
        ORDER BY rc.name1
      `;
        partnerDues.push(data);
      }
    }
  } catch (error) {
    partnerDues = [];
  }

  return {
    partners,
    partnerDues,
  };
};
