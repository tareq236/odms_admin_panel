import SearchDa from "@/components/constants/SearchDa";
import db from "../../../../db/db";
import NoData from "@/components/constants/NoData";
import AttendanceSection from "@/components/da-summary/profile-attendance/AttendanceSection";
import { rdl_attendance } from "@prisma/client";
import ProfileSection from "@/components/da-summary/profile-attendance/ProfileSection";

export default async function DaSummaryPage({
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
      db.$queryRaw`
      SELECT ra.*, ru.full_name FROM rdl_attendance ra 
      INNER JOIN rdl_user_list ru ON ru.sap_id = ra.sap_id
      WHERE ra.start_date_time >= ${startDate} AND ra.start_date_time < ${endDate}
      AND ra.sap_id = ${searchParams.q}
    `,
    ]);
  } catch (error) {
    daInfo = null;
    daAttendance = null;
  }


  if (!searchParams.q) return <SearchDa />;

  if (daInfo == null) return <NoData />;

  return (
    <div className="grid grid-cols-1 gap-5">
      <ProfileSection daInfo={daInfo} />

      <AttendanceSection daAttendance={daAttendance as any[]} />
    </div>
  );
}
