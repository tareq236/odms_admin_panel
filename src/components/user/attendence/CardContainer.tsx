import React from "react";
import Card from "./Card";
import db from "../../../../db/db";
import {formateDateDB} from '@/lib/formatters'

type CardContainerProps = {
  searchParams: {
    start: string;
  };
};

export default async function CardContainer({
  searchParams,
}: CardContainerProps) {
  let date = searchParams.start ? searchParams.start.split("-") : undefined;
  let startDate =
    date == undefined
      ? new Date()
      : new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

  let endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 1
  );

  let dailyAttendance: unknown | any;
  let userCount;
  try {
    [dailyAttendance, userCount] = await Promise.all([
      db.$queryRaw`
      SELECT COUNT(sap_id) as total_attendance
      FROM rdl_attendance 
      WHERE start_date_time > ${formateDateDB(startDate)} AND start_date_time < ${endDate}
      GROUP BY CAST(start_date_time as DATE) 
      `,
      db.rdl_user_list.count(),
    ]);
  } catch (error) {
    dailyAttendance = [{ total_attendance: 0 }];
    userCount = 0;
  }
  return (
    <div className="right flex flex-wrap gap-3">
      <Card
        title="Attendance"
        count={Number(dailyAttendance[0]?.total_attendance ?? 0)}
      />
      <Card
        title="Absence"
        count={userCount - Number(dailyAttendance[0]?.total_attendance ?? 0)}
      />
    </div>
  );
}
