import Search from "@/components/ui/Search";
import React from "react";
import db from "../../../../db/db";
import { formatNumber } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import DatePicker from "@/components/ui/DatePicker";

export default async function FilterSection({
  searchParams,
}: {
  searchParams: { start: string };
}) {
  const currentDate = new Date(searchParams.start) || new Date();

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

  const userCount = await db.rdl_user_list.count();

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
      <div className="right flex flex-wrap gap-3">
        <article className="card flex items-center gap-5 border rounded-md px-6 py-2">
          <h6 className="text-[12px] text-gray-500">Attendance</h6>
          <Separator orientation="vertical" className="h-5" />
          <h5 className="text-xl text-primary">
            {formatNumber(dailyAttendance)}
          </h5>
        </article>
        <article className="card flex items-center gap-5 border rounded-md px-6 py-2">
          <h6 className="text-[12px] text-gray-500">Absence</h6>
          <Separator orientation="vertical" className="h-5" />
          <h5 className="text-xl text-primary">
            {formatNumber(Number(userCount - dailyAttendance))}
          </h5>
        </article>
      </div>
    </section>
  );
}
