import React from "react";
import Card from "./Card";
import db from "../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

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

  let dailyAttendance: unknown | any;
  let userCount;

  const authUser = await getUser();

  if (!authUser) return redirect("/login");

  try {
    if (authUser.role === "admin") {
      [dailyAttendance, userCount] = await Promise.all([
        db.$queryRaw`
        SELECT COUNT(sap_id) as total_attendance
        FROM rdl_attendance 
        WHERE DATE(start_date_time) = ${formateDateDB(startDate)}
        GROUP BY CAST(start_date_time as DATE) 
        `,
        db.rdl_users_list.count(),
      ]);
    } else {
      [dailyAttendance, userCount] = await Promise.all([
        db.$queryRaw`
        SELECT COUNT(id) as total_attendance
        FROM rdl_attendance ra
        LEFT JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
        WHERE DATE(ra.start_date_time) = ${formateDateDB(startDate)}
        AND ru.depot_code = ${authUser.depot_code}
        GROUP BY CAST(start_date_time as DATE) 
        `,
        db.rdl_users_list.count({
          where: {
            depot_code: authUser.depot_code,
          },
        }),
      ]);
    }
  } catch (error) {
    console.error(error);
    dailyAttendance = [{ total_attendance: 0 }];
    userCount = 0;
  }
  return (
    <div className="right flex flex-wrap gap-3 flex-1">
      <Card
        state="1"
        title="Attendance"
        count={Number(dailyAttendance[0]?.total_attendance ?? 0)}
      />
      <Card
        state="0"
        title="Absence"
        count={userCount - Number(dailyAttendance[0]?.total_attendance ?? 0)}
      />
    </div>
  );
}
