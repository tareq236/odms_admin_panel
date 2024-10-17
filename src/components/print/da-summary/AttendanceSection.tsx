import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatNumber } from "@/lib/formatters";
import { rdl_attendance } from "@prisma/client";
import React from "react";

function AttendanceSection({
  daAttendance,
}: {
  daAttendance: rdl_attendance[];
}) {
  return (
    <section>
      <div className="flex justify-between items-center gap-5">
        <h2 className="h2 mb-3">Attendance Information</h2>
        <div className="flex flex-col items-end gap-1">
          <span className="font-medium text-sm">
            {daAttendance && daAttendance[0] != undefined ? (
              <Badge className="bg-green-200 text-green-900 hover:bg-green-100">
                Present
              </Badge>
            ) : (
              <Badge
                variant={"destructive"}
                className="bg-rose-200 text-rose-900 hover:bg-rose-100"
              >
                Absent
              </Badge>
            )}
          </span>
        </div>
      </div>

      {daAttendance != undefined && daAttendance[0] != undefined && (
        <article className="grid grid-cols-4 gap-4 mt-3">
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
