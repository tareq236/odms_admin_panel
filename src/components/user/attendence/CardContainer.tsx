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
  let date = searchParams.start ? searchParams.start.split("-") : undefined;
  let startDate =
    date == undefined ? new Date() : new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

  let endDate = new Date(startDate.getFullYear(),startDate.getMonth(), startDate.getDate() + 1, 
  );

  let dailyAttendance, userCount;
  try {
    [dailyAttendance, userCount] = await Promise.all([
      db.rdl_attendance.count({
        where: {
          start_date_time: {
            gte: startDate,
            lt: endDate,
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










// const currentDate = new Date(searchParams.start) || new Date();

//   let currentFormatDate = format(currentDate, 'yyyy-MM-dd')
//   let nextFormatDate = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1), 'yyyy-MM-dd')

//   let dailyAttendance: any | unknown, userCount;
//   try {
//     [dailyAttendance, userCount] = await Promise.all([
//       db.$queryRaw(
//         Prisma.sql`
//         SELECT COUNT(sap_id) as count 
//         FROM rdl_attendance 
//         WHERE start_date_time > ${currentFormatDate} 
//         AND start_date_time < ${nextFormatDate} 
//         `,
//       ),
//       db.rdl_user_list.count(),
//     ]);
//   } catch (error) {
//     dailyAttendance = [{count: 0}];
//     userCount = 0;
//   }