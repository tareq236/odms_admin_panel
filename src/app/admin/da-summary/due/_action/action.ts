import db from "../../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";

export const getDueList = async (searchParams: {
  q: string;
  start: string;
}) => {
  let partners: (unknown | any)[];

  const startDate = searchParams.start
    ? `${searchParams.start}`
    : `${formateDateDB(new Date())}`;

  const daCode = Number(searchParams.q) || 0;

  try {
    partners = await db.$queryRaw`
    select DISTINCT rd.partner 
    from rdl_delivery rd
    WHERE rd.billing_date=${startDate} 
    AND rd.da_code=${daCode} AND rd.due_amount > 0
    `;
  } catch (error) {
    partners = [];
  }

  let partnerDues: any[] = [];

  try {
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
  } catch (error) {
    partnerDues = [];
  }

  return {
    partners,
    partnerDues,
  };
};
