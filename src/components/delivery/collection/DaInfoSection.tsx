import UserStatusTag from "@/components/user/UserStatusTag";
import React from "react";
import db from "../../../../db/db";
import { MessageSquareOff } from "lucide-react";
import { getUser } from "@/lib/dal";
import { formateDateDB } from "@/lib/formatters";
import { redirect } from "next/navigation";

export default async function DaInfoSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  let daInfo;

  const user = await getUser();

  if (!user) redirect("/login");

  const isDepotDA: any = await db.$queryRaw`
        select count(*) over () as total
        from
            rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
        WHERE
            a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            }
            AND a.da_code = ${Number(searchParams.q) || 0}
            AND a.route IN (
                SELECT route_code
                FROM rdl_route_wise_depot
                WHERE
                    depot_code =${user.depot_code}
            )
      `;

  try {
    if (
      user.role == "admin" ||
      (isDepotDA && isDepotDA.length > 0 && searchParams.q)
    ) {
      daInfo = await db.rdl_users_list.findUnique({
        where: { sap_id: Number(searchParams.q || 0) },
      });
    }
  } catch (error) {
    daInfo = null;
  }

  return (
    <section className="my-6">
      <h2 className="text-muted-foreground mb-3">DA Information</h2>

      {daInfo != null ? (
        <article className="p-4 border rounded flex items-center flex-wrap justify-between gap-4">
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">DA Name</span>
            <span className="font-medium text-sm">{daInfo.full_name}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Depot Name</span>
            <span className="font-medium text-sm">{daInfo.user_depot}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Mobile</span>
            <span className="font-medium text-sm">{daInfo.mobile_number}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Type</span>
            <span className="font-medium text-sm">{daInfo.user_type}</span>
          </p>
          <div className="flex flex-col gap-1 self-center">
            <span className="text-xs text-muted-foreground">Status</span>
            <span className="font-medium text-sm">
              <UserStatusTag status={daInfo.status.toString() as string} />
            </span>
          </div>
        </article>
      ) : (
        <article className="p-4 border rounded text-muted-foreground flex flex-col justify-center items-center">
          <MessageSquareOff className="size-10" />
          <span className="text-[11px]">No user found</span>
        </article>
      )}
    </section>
  );
}
