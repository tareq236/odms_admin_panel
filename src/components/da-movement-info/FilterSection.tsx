import React from "react";
import Search from "../ui/Search";

import ExportSection from "./ExportSection";
import DateFilter from "./DateFilter";

export default function FilterSection({ data }: { data: any[] }) {
  return (
    <section className="my-6 flex justify-between items-center gap-5 flex-wrap">
      <div className="flex items-center gap-3 flex-wrap">
        <DateFilter />

        <Search placeholder="Search by da code" />
      </div>

      <ExportSection data={data} />
    </section>
  );
}
