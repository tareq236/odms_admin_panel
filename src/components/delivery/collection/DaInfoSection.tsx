import UserStatusTag from "@/components/user/UserStatusTag";
import React, { ReactNode } from "react";
import db from "../../../../db/db";
import { MessageSquareOff } from "lucide-react";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { formateDateDB } from "@/lib/formatters";

export default async function DaInfoSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  let daInfo = null;
  let daRoute: any[] | null = null;

  const user = await getUser();

  if (!user) redirect("/login");

  // get da information and da route information
  [daInfo, daRoute] = await Promise.all([
    db.rdl_users_list.findUnique({
      where: { sap_id: Number(searchParams.q || 0) },
    }),
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

  const routeName = daRoute
    ? daRoute.map((item) => item.description).join("; ")
    : "-";

  return (
    <section className="my-6">
      <h2 className="text-muted-foreground mb-3">DA Information</h2>

      {user.role == "admin" ||
      (daInfo?.depot_code === user.depot_code && searchParams.q) ? (
        <article className="p-4 border rounded flex items-center flex-wrap justify-between gap-4">
          <Field name="DA Name" value={daInfo?.full_name} />
          <Field name="Depot Name" value={daInfo?.user_depot} />
          <Field name="Mobile" value={daInfo?.mobile_number} />
          <Field name="Type" value={daInfo?.user_type} />
          {routeName && <Field name="Route" value={routeName} />}

          <Field
            name="Status"
            value={
              <UserStatusTag status={daInfo?.status.toString() as string} />
            }
          />
        </article>
      ) : (
        <article className="p-4 border rounded text-muted-foreground flex flex-col justify-center items-center">
          <MessageSquareOff className="size-10" />
          <span className="text-[11px]">No User Data</span>
        </article>
      )}
    </section>
  );
}

const Field = ({
  name,
  value,
}: {
  name: string;
  value: string | ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1 self-center">
      <span className="text-xs text-muted-foreground">{name}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
};
