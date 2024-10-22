import DueTable from "@/components/da-summary/due/DueTable";
import React from "react";

import { getDueList } from "./_action/action";
import Accordion from "@/components/da-summary/accordion/Accordion";

async function DueSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  const { partnerDues } = await getDueList(searchParams);

  return (
    <section className="flex flex-col gap-5">
     

      {/* partner wise data */}
      {partnerDues.length > 0 &&
        partnerDues.map((item, index) => (
          <Accordion show={index===0} name={`${item[0].partner} - ${item[0].name1} - ${item[0].street}, ${item[0].district}`} key={index}>
            <DueTable dueData={item as any[]} />
          </Accordion>
        ))}
    </section>
  );
}

export default DueSummaryPage;
