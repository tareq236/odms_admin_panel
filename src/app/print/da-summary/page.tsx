import AttendanceSection from "@/components/print/da-summary/AttendanceSection";
import DaInfoSection from "@/components/print/da-summary/DaInfoSection";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatters";
import React, { Suspense } from "react";
import db from "../../../../db/db";
import { rdl_attendance, rdl_user_list } from "@prisma/client";
import DeliverySection from "@/components/print/da-summary/DeliverySection";
import DeliveryListSection from "@/components/print/da-summary/DeliveryListSection";

export default async function DaSummaryPrintPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  let daInfo, daAttendance;
  let date = searchParams.start ? searchParams.start.split("-") : undefined;
  let startDate =
    date == undefined
      ? new Date()
      : new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

  let endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 1,
  );

  try {
    [daInfo, daAttendance] = await Promise.all([
      db.rdl_user_list.findUnique({
        where: { sap_id: Number(searchParams.q || 0) },
      }),
      db.rdl_attendance.findMany({
        where: {
          AND: [
            {
              start_date_time: {
                gte: startDate,
                lt: endDate,
              },
            },
            {
              sap_id: Number(searchParams.q) || null,
            },
          ],
        },
      }),
    ]);
  } catch (error) {
    daInfo = null;
    daAttendance = null;
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b pb-5">
              <div className="w-full flex justify-between items-center gap-5">
                <div className="flex flex-col gap-1">
                  <h1 className="h1">ODMS Admin Panel</h1>
                  <p>Delivery Assistant Summary</p>
                </div>
                <div className="date flex flex-col items-end gap-1">
                  <p className="text-muted-foreground font-semibold">Date</p>
                  <p>{formatDate(new Date())}</p>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="py-10 flex flex-col gap-5">
              <DaInfoSection daInfo={daInfo as rdl_user_list} />
              <Separator />
              <AttendanceSection
                daAttendance={daAttendance as rdl_attendance[]}
              />
              <Separator />

              <Suspense fallback={<p>Loading...</p>}>
                <DeliverySection searchParams={searchParams} />
              </Suspense>

              <Separator />

              <DeliveryListSection searchParams={searchParams} />
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
