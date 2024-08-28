import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import AttendanceTable from "@/components/user/attendence/AttendanceTable";
import FilterSection from "@/components/user/attendence/FilterSection";
import { Prisma } from "@prisma/client";
import { ListTodo } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../../db/db";

export default async function UserAttendancePage({
  searchParams,
}: {
  searchParams: { q: string; p: string; start: string; end: string };
}) {
  return (
    <>
      <PageHeader
        title="User Attendance"
        icon={<ListTodo className="size-5 fill-primary/20" />}
      />

      <Suspense>
        <FilterSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export type AttendanceTableProps = Prisma.rdl_attendanceGetPayload<{
  include: { rdl_user_list: true };
}>;

const DataTable = async ({
  searchParams,
}: {
  searchParams: { q: string; p: string; start: string; end: string };
}) => {
  let count = 0;
  let data: AttendanceTableProps[] = [];
  const limit = 20;
  let connectionError = false;

  console.log(new Date(searchParams.start))

  try {
    if (searchParams.end) {
      [data, count] = await Promise.all([
        db.rdl_attendance.findMany({
          include: { rdl_user_list: true },
          where: {
            start_date_time: {
              gte: new Date(searchParams.start),
              lte: new Date(searchParams.end),
            },
          },
          take: limit,
          skip: limit * (Number(searchParams.p || 1) - 1),
        }),
        db.rdl_attendance.count({
          where: {
            start_date_time: {
              gte: new Date(searchParams.start),
              lte: new Date(searchParams.end),
            },
          },
        }),
      ]);
    } else {
      [data, count] = await Promise.all([
        db.rdl_attendance.findMany({
          include: { rdl_user_list: true },
          orderBy: { created_at: "desc" },
          take: limit,
          skip: limit * (Number(searchParams.p || 1) - 1),
        }),
        db.rdl_attendance.count(),
      ]);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if ((error.code = "P1001")) {
        data = [] as AttendanceTableProps[];
        connectionError = true;
      }
    }
  }

  return (
    <section className="data-table-section">
      <AttendanceTable data={data} connectionError={connectionError} />
      <PagePagination limit={limit} count={count} />
    </section>
  );
};
