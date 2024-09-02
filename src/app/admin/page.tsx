import { ChartSection } from "@/containers/home/ChartSections";
import React from "react";
import db from "../../../db/db";
import { Prisma } from "@prisma/client";

export default async function Home() {
  const currentDate = new Date('2024-08-26');

  // const data = await db.$queryRaw(
  //   Prisma.sql`
  //   SELECT DATE_
  //   `
  // )

  // console.log(data);

  return (
    <div className="">
      <ChartSection />
    </div>
  );
}
