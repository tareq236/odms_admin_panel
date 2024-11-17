import React from "react";
import Search from "../ui/Search";
import DatePicker from "../ui/DatePicker";
import TrackSection from "./TrackSection";
import { getConveyanceData } from "@/app/admin/map/conveyance/_action/action";

export default async function FilterSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  let limit = 20;
  const { data, count } = await getConveyanceData({
    searchParams: searchParams,
    limit: limit,
  });

  return (
    <section className="filter-section flex-wrap">
      <div className="flex items-center gap-5 flex-wrap">
        <DatePicker />
        <Search placeholder="Search by DA code" />
      </div>
      {(count > 0) && <TrackSection data={data as any[]} />}
    </section>
  );
}
