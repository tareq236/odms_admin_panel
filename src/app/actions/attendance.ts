import { getUser } from "@/lib/dal";
import db from "../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { redirect } from "next/navigation";

export const getAttendance = async ({
  searchParams,
  limit = 20,
}: {
  searchParams: { q: string; p: string; start: string; status: string };
  limit?: number;
}) => {
  let data;
  const status = searchParams?.status ?? "1";

  let date = searchParams.start ? searchParams.start.split("-") : undefined;
  let startDate =
    date == undefined
      ? new Date()
      : new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

  // get auth user info
  const authUser = await getUser();

  if (!authUser) return redirect("/login");

  try {
    if (authUser.role === "admin") {
      // get for admin
      if (status === "1") {
        // get attendance
        if (searchParams.q) {
          data = await db.$queryRaw`
          SELECT ra.*, ru.full_name, COUNT(*) OVER() count FROM rdl_attendance ra 
          INNER JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
          WHERE DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          AND ra.sap_id = ${searchParams.q}
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        } else {
          data = await db.$queryRaw`
          SELECT ra.*, ru.full_name, COUNT(*) OVER() count FROM rdl_attendance ra 
          INNER JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
          WHERE DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        }
      } else {
        // get absence
        if (searchParams.q) {
          data = await db.$queryRaw`
          SELECT ra.*, ru.full_name, ru.sap_id, COUNT(*) OVER() count FROM rdl_users_list ru
          LEFT JOIN rdl_attendance ra ON ru.sap_id = ra.sap_id 
          AND DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          WHERE ra.sap_id = ${searchParams.q}
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        } else {
          data = await db.$queryRaw`
           SELECT ra.*, ru.full_name, ru.sap_id, COUNT(*) OVER() count FROM rdl_users_list ru
          LEFT JOIN rdl_attendance ra ON ru.sap_id = ra.sap_id 
          AND DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          WHERE ra.sap_id is NULL
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        }
      }
    } else {
      // for depot
      if (status === "1") { // get present
        if (searchParams.q) {
          data = await db.$queryRaw`
          SELECT ra.*, ru.full_name, COUNT(*) OVER() count FROM rdl_attendance ra 
          INNER JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
          WHERE DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          AND ra.sap_id = ${searchParams.q} AND ru.depot_code = ${
            authUser.depot_code
          }
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        } else {
          data = await db.$queryRaw`
          SELECT ra.*, ru.full_name, COUNT(*) OVER() count FROM rdl_attendance ra 
          INNER JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
          WHERE DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          AND ru.depot_code = ${authUser.depot_code}
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        }
      } else { // get absence
        if (searchParams.q) {
          data = await db.$queryRaw`
          SELECT ra.*, ru.full_name, COUNT(*) OVER() count FROM rdl_attendance ra 
          INNER JOIN rdl_users_list ru ON ru.sap_id = ra.sap_id
          WHERE DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          AND ra.sap_id = ${searchParams.q} AND ru.depot_code = ${
            authUser.depot_code
          }
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        } else {
          data = await db.$queryRaw`
          SELECT ra.*, ru.full_name, ru.sap_id, COUNT(*) OVER() count FROM rdl_users_list ru
          LEFT JOIN rdl_attendance ra ON ru.sap_id = ra.sap_id AND DATE(ra.start_date_time) = ${formateDateDB(startDate)}
          WHERE ra.sap_id is null
          AND ru.depot_code = ${authUser.depot_code}
          LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        `;
        }
      }
    }
  } catch (error) {}

  return data as any[];
};
