import UserStatusTag from "@/components/user/UserStatusTag";
import React from "react";
import db from "../../../../db/db";
import { MessageSquareOff } from "lucide-react";

export default async function DaInfoSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  let daInfo;
  try {
    daInfo = await db.rdl_users_list.findUnique({
      where: { sap_id: Number(searchParams.q || 0) },
    });
  } catch (error) {
    daInfo = null
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
