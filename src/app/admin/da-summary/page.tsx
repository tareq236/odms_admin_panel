import SearchDa from "@/components/constants/SearchDa";
import db from "../../../../db/db";
import NoData from "@/components/constants/NoData";
import AttendanceSection from "@/components/da-summary/profile-attendance/AttendanceSection";
import ProfileSection from "@/components/da-summary/profile-attendance/ProfileSection";
import { formateDateDB } from "@/lib/formatters";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function DaSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  let daInfo = null,
    daAttendance = null;
  let daRoute: any[] | null = null;

  let date = searchParams.start ? searchParams.start.split("-") : undefined;
  let startDate =
    date == undefined
      ? new Date()
      : new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

  let endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 1
  );

  const user = await getUser();

  if (!user) redirect("/login");

  try {
    if (user.role === "admin") {
      [daInfo, daAttendance, daRoute] = await Promise.all([
        db.rdl_users_list.findUnique({
          where: { sap_id: Number(searchParams.q || 0) },
        }),
        db.$queryRaw`
        SELECT ra.*, ru.full_name FROM rdl_attendance ra 
        INNER JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
        WHERE ra.start_date_time >= ${formateDateDB(
          startDate
        )} AND ra.start_date_time < ${formateDateDB(endDate)}
        AND ra.sap_id = ${searchParams.q}
      `,
        db.$queryRaw`
          select DISTINCT (rrs.description), rrs.route FROM rdl_delivery_info_sap rdis 
          inner join rdl_route_sap rrs on rrs.route = rdis.route
          WHERE rdis.billing_date = ${
            searchParams.start
              ? `${searchParams.start}`
              : `${formateDateDB(new Date())}`
          } AND rdis.da_code = ${Number(searchParams.q || 0)}
        ` as any,
      ]);
    } else {
      [daInfo, daAttendance, daRoute] = await Promise.all([
        db.rdl_users_list.findFirst({
          where: {
            AND: [
              {
                sap_id: Number(searchParams.q || 0),
              },
              {
                depot_code: user.depot_code,
              },
            ],
          },
        }),
        db.$queryRaw`
        SELECT ra.*, ru.full_name FROM rdl_attendance ra 
        INNER JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
        WHERE ra.start_date_time >= ${formateDateDB(
          startDate
        )} AND ra.start_date_time < ${formateDateDB(endDate)}
        AND ra.sap_id = ${searchParams.q}
      `,
        db.$queryRaw`
          select DISTINCT (rrs.description), rrs.route FROM rdl_delivery_info_sap rdis 
          inner join rdl_route_sap rrs on rrs.route = rdis.route
          WHERE rdis.billing_date = ${
            searchParams.start
              ? `${searchParams.start}`
              : `${formateDateDB(new Date())}`
          } AND rdis.da_code = ${Number(searchParams.q || 0)}
        ` as any,
      ]);
    }
  } catch (error) {
    daInfo = null;
    daAttendance = null;
  }

  if (!searchParams.q) return <SearchDa />;

  if (daInfo == null) return <NoData />;

  return (
    <div className="grid grid-cols-1 gap-5">
      <ProfileSection daInfo={daInfo} daRoute={daRoute as any[]} />

      <AttendanceSection daAttendance={daAttendance as any[]} />
    </div>
  );
}
