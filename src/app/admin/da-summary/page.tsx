import SearchDa from "@/components/constants/SearchDa";
import db from "../../../../db/db";
import UserStatusTag from "@/components/user/UserStatusTag";
import { MessageSquareOff } from "lucide-react";
import { formatDateTime, formatNumber } from "@/lib/formatters";
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

  if (!searchParams.q) return <SearchDa />;

  if (daInfo == null) return <NoData />;

  return (
    <div className="grid grid-cols-1 gap-5">
      <ProfileSection daInfo={daInfo} />

      <AttendanceSection daAttendance={daAttendance as rdl_attendance[]} />
    </div>
  );
}
