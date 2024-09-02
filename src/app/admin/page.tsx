import { ChartSection } from "@/containers/home/ChartSections";
import React from "react";
import db from "../../../db/db";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import Header from "@/containers/home/Header";

export type CartData = {
  day: Date;
  total_attendance: bigint;
};

export default async function Home() {
  const date = new Date();
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const prevMonth = format(new Date(date.getFullYear(), date.getMonth()-1, date.getDate()),'yyyy-MM-dd');
  let count = 0
  let data:CartData[] | unknown;

  try {
    [data, count] = await Promise.all([
      db.$queryRaw(
        Prisma.sql`
    SELECT CONVERT_TZ(start_date_time, '+00:00', '+06:00') as day, COUNT(sap_id) as total_attendance
    FROM rdl_attendance 
    WHERE start_date_time > ${prevMonth} AND start_date_time < ${currentDate} 
    GROUP BY CAST(CONVERT_TZ(start_date_time, '+00:00', '+06:00') as DATE) 
    `,
      ),
      db.rdl_user_list.count(),

    ]);
  } catch (error) {
    data = [];
  }


  return (
    <div className="">
      <Header />
      <ChartSection data={data as CartData[]} count={count} />
    </div>
  );
}
