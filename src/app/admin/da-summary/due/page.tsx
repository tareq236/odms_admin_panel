import DueTable from "@/components/da-summary/due/DueTable";
import React from "react";
import db from "../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";

async function DueSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  let dueData;

  try {
    dueData = await db.$queryRaw`
      select rd.billing_doc_no, 
      rd.partner, rc.name1, rc.street, rc.district, rd.due_amount, rd.net_val
      from rdl_delivery rd
      INNER JOIN rpl_customer rc ON rc.partner=rd.partner
      WHERE rd.billing_date=${
        searchParams.start
          ? `${searchParams.start}`
          : `${formateDateDB(new Date())}`
      } AND rd.da_code=${Number(searchParams.q) || 0} AND rd.due_amount > 0
      ORDER BY rc.name1
    `;
  } catch (error) {
    dueData = []
  }

  return (
    <div>
      <h3>Overview</h3>

      <DueTable dueData={dueData as any[]} />
    </div>
  );
}

export default DueSummaryPage;
