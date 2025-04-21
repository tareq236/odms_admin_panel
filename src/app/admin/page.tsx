import React from "react";
import db from "../../../db/db";
import { Prisma } from "@/prisma/generated/client1";
import { format } from "date-fns";
import Header from "@/components/home/Header";
import { ChartSection } from "@/components/home/ChartSections";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export type CartData = {
  day: Date;
  total_attendance: bigint;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { m: string };
}) {
  const { m } = await searchParams;

  const date = new Date();
  const currentDate = format(
    new Date(
      date.getFullYear(),
      Number(m || date.getMonth()),
      date.getDate() + 1
    ),
    "yyyy-MM-dd"
  );
  const prevMonth = format(
    new Date(
      date.getFullYear(),
      Number(m || date.getMonth()) - 1,
      date.getDate()
    ),
    "yyyy-MM-dd"
  );
  let count = 0;
  let data: CartData[] | unknown;

  // get auth user info
  const authUser = await getUser();

  if (!authUser) return redirect("/login");

  try {
    if (authUser.role === "admin") {
      [data, count] = await Promise.all([
        db.$queryRaw(
          Prisma.sql`
          SELECT CAST(start_date_time as DATE)  as day, COUNT(sap_id) as total_attendance
          FROM rdl_attendance 
          WHERE start_date_time > ${prevMonth} AND start_date_time < ${currentDate} 
          GROUP BY CAST(start_date_time as DATE) 
      `
        ),
        db.rdl_users_list.count(),
      ]);
    } else {
      [data, count] = await Promise.all([
        db.$queryRaw(
          Prisma.sql`
          SELECT CAST(ra.start_date_time as DATE) as day, COUNT(ra.sap_id) as total_attendance
          FROM rdl_attendance ra
          LEFT JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
          WHERE start_date_time > ${prevMonth} AND start_date_time < ${currentDate} 
              AND ru.depot_code = ${authUser.depot_code}
          GROUP BY
              CAST(ra.start_date_time as DATE)
      `
        ),
        db.rdl_users_list.count({
          where: { depot_code: authUser.depot_code },
        }),
      ]);
    }
  } catch (error) {
    data = [];
  }

  return (
    <div>
      <Header />
      <ChartSection data={data as CartData[]} count={count} />
    </div>
  );
}
