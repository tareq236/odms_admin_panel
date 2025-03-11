import React from "react";
import Search from "../ui/Search";
import DatePicker from "../ui/DatePicker";
import TrackSection from "./TrackSection";
import { getConveyanceData } from "@/app/admin/map/transportation/_action/action";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";
import Link from "next/link";
import { formateDateDB } from "@/lib/formatters";

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
    <section className="filter-section flex-wrap print:hidden">
      <div className="flex items-center gap-5 flex-wrap">
        <DatePicker />
        <Search placeholder="Search by DA code" />
      </div>
      {count > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant={'outline'} className="text-primary" asChild>
            <Link href={`/print/transportation?q=${searchParams.q}&start=${searchParams.start ?? formateDateDB(new Date())}`}>
            <Printer className="size-4 mr-2" /> Export
            </Link>
          </Button>
          <TrackSection data={data as any[]} />
        </div>
      )}
    </section>
  );
}
