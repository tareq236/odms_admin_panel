import React from "react";
import Card from "./Card";
import db from "../../../../db/db";

type CardContainerProps = {
  searchParams: {
    start: string;
  };
};

export default async function CardContainer({
  searchParams,
}: CardContainerProps) {
  const currentDate = new Date(searchParams.start) || new Date();
  let dailyAttendance, userCount;
  try {
    [dailyAttendance, userCount] = await Promise.all([
      db.rdl_attendance.count({
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
      }),
      db.rdl_user_list.count(),
    ]);
  } catch (error) {
    dailyAttendance = 0;
    userCount = 0;
  }
  return (
    <div className="right flex flex-wrap gap-3">
      <Card title="Attendance" count={dailyAttendance} />
      <Card title="Absence" count={userCount - dailyAttendance} />
    </div>
  );
}
