import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatNumber } from "@/lib/formatters";
import React from "react";

function AttendanceSection({ daAttendance }: { daAttendance: any[] }) {
  const startDate = daAttendance !=undefined && daAttendance.length > 0 ? daAttendance[0].start_date_time as Date : new Date();
  const endDate = daAttendance !=undefined && daAttendance.length > 0 ? daAttendance[0].end_date_time as Date : new Date();
  if (startDate) {
    startDate.setUTCHours(0);
  }
  if (endDate) {
    endDate.setUTCHours(0);
  }

  return (
    <section className="border rounded p-4">
      <div className="header flex flex-wrap justify-between items-center gap-5">
        <h2 className="text-foreground font-semibold mb-5 text-lg">
          Attendance
        </h2>

        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xs text-muted-foreground">
            Today&apos;s Status
          </span>
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
        <article className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Start from</span>
            <span className="font-medium text-sm">
              {formatDateTime(startDate)}
            </span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">End at</span>
            <span className="font-medium text-sm">
              {formatDateTime(endDate)}
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
