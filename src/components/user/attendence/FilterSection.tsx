import Search from "@/components/ui/Search";
import React, { Suspense } from "react";
import DatePicker from "@/components/ui/DatePicker";
import CardContainer from "./CardContainer";

export default async function FilterSection({
  searchParams,
}: {
  searchParams: { start: string };
}) {
  return (
    <section className="my-6 flex flex-wrap-reverse justify-between items-center gap-5">
      {/* left */}
      <div className="left flex items-center gap-3 flex-wrap">
        {/* search by sap id */}
        <Search placeholder="Search by ID" />

        {/* date range */}
        <DatePicker />
      </div>

      {/* attendance card */}
      <Suspense>
        <CardContainer searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
