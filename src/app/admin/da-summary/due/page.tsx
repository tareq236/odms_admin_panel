import DueTable from "@/components/da-summary/due/DueTable";
import React from "react";

import { getDueList } from "./_action/action";

async function DueSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  const { dueData } = await getDueList(searchParams);

  return (
    <div>
      <h3 className="flex items-center gap-3">
        <span className="w-3 aspect-square bg-primary rounded"></span>
        Overview
      </h3>

      <DueTable dueData={dueData as any[]} />
    </div>
  );
}

export default DueSummaryPage;
