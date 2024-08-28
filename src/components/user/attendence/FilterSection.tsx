import RangePicker from "@/components/ui/RangePicker";
import Search from "@/components/ui/Search";
import React from "react";
import db from "../../../../db/db";
import { formatDate, formatNumber } from "@/lib/formatters";
import { Dot } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default async function FilterSection() {
  const currentDate = new Date();

  const dailyAttendance = await db.rdl_attendance.count({
    where: {
      start_date_time: {
        gte: currentDate,
        lte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1,
        ),
      },
    },
  });

  return (
    <section className="my-6 flex flex-wrap-reverse justify-between items-center gap-5">
      {/* left */}
      <div className="left flex items-center gap-3 flex-wrap">
        {/* search by sap id */}
        <Search placeholder="Search by ID" />

        {/* date range */}
        <RangePicker />
      </div>

      {/* attendance card */}
      <article className="card flex items-center gap-5 border rounded-md px-6 py-2">
          <h6 className="text-[12px] text-gray-500">Today&apos;s Attendance</h6>
          <Separator orientation="vertical" className="h-5" />
          <h5 className="text-xl text-primary">
            {formatNumber(dailyAttendance)}
          </h5>
      </article>
    </section>
  );
}
