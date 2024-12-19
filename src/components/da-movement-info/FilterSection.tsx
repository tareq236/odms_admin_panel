import React from "react";
import Search from "../ui/Search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import ExportSection from "./ExportSection";

export default function FilterSection({ data }: { data: any[] }) {
  return (
    <section className="my-6 flex justify-between items-center gap-5 flex-wrap">
      <div className="flex items-center gap-3 flex-wrap">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Search placeholder="Search by da code" />
      </div>

      <ExportSection data={data} />
    </section>
  );
}
