import { formatDateTime, formatNumber } from "@/lib/formatters";
import { rdl_attendance } from "@prisma/client";
import React from "react";

function AttendanceSection({daAttendance}: {daAttendance: rdl_attendance[]}) {
  return (
    <section className="border rounded p-4">
      <div className="header flex flex-wrap justify-between items-center gap-5 mb-3">
        <h2 className="text-foreground font-semibold mb-5 text-lg">
          Attendance
        </h2>

        <p className="flex flex-col items-end gap-0.5">
          <span className="text-xs text-muted-foreground">
            Today&apos;s Status
          </span>
          <span className="font-medium text-sm">
            {daAttendance && daAttendance[0] != undefined
              ? "Present"
              : "Absent"}
          </span>
        </p>
      </div>
      {daAttendance != undefined && daAttendance[0] != undefined && (
        <article className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Start from</span>
            <span className="font-medium text-sm">
              {formatDateTime(daAttendance[0].start_date_time as Date)}
            </span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">End at</span>
            <span className="font-medium text-sm">
              {formatDateTime(daAttendance[0].end_date_time as Date)}
            </span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">
              Late time (min)
            </span>
            <span className="font-medium text-sm">
              {formatNumber(Number(daAttendance[0].late_time_min))}
            </span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">
              Overtime (min)
            </span>
            <span className="font-medium text-sm">
              {formatNumber(Number(daAttendance[0].over_time_min))}
            </span>
          </p>
        </article>
      )}
    </section>
  );
}

export default AttendanceSection;
