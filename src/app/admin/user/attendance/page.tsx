import PageHeader from "@/components/ui/PageHeader";
import PagePagination from "@/components/ui/PagePagination";
import TableSkeleton from "@/components/ui/TableSkeletion";
import AttendanceTable from "@/components/user/attendence/AttendanceTable";
import FilterSection from "@/components/user/attendence/FilterSection";
import { Prisma } from "@prisma/client";
import { ListTodo } from "lucide-react";
import React, { Suspense } from "react";
import { getAttendance } from "@/app/actions/attendance";

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

      <FilterSection searchParams={searchParams} />

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
  let data: any[] = [];
  const limit = 20;
  let connectionError = false;

  try {
    const { data: attendanceData, count: attendanceCount } =
      await getAttendance({ searchParams, limit });
    data = attendanceData;
    count = attendanceCount;
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
      <AttendanceTable
        data={data as AttendanceTableProps[]}
        connectionError={connectionError}
      />
      <PagePagination limit={limit} count={count} />
    </section>
  );
};
