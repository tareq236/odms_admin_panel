import DueTable from "@/components/da-summary/due/DueTable";
import React from "react";

import { getDueList } from "./_action/action";
import Accordion from "@/components/da-summary/accordion/Accordion";

async function DueSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  const { dueData, partnerDues } = await getDueList(searchParams);

  return (
    <section className="flex flex-col gap-5">
      {/* overview */}
      <Accordion name="Overview" show={true}>
        <DueTable dueData={dueData as any[]} />
      </Accordion>

      {/* partner wise data */}
      {partnerDues.length > 0 &&
        partnerDues.map((item, index) => (
          <Accordion name={`Partner - ${item[0].name1}`} key={index}>
            <DueTable dueData={item as any[]} />
          </Accordion>
        ))}
    </section>
  );
}

export default DueSummaryPage;
