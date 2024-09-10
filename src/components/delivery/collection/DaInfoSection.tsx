import { Card, CardContent } from "@/components/ui/card";
import UserStatusTag from "@/components/user/UserStatusTag";
import React from "react";
import db from "../../../../db/db";
import { MessageSquareOff } from "lucide-react";

export default async function DaInfoSection({
  searchParams,
}: {
  searchParams: { p: string; q: string; start: string };
}) {
  const daInfo = await db.rdl_user_list.findUnique({
    where: { sap_id: Number(searchParams.q || 0) },
  });

  return (
    <section className="my-6">
      <h3 className="text-muted-foreground mb-3">DA Information</h3>

      {daInfo != null ? (
        <article className="p-4 border rounded grid grid-cols-2 md:grid-cols-4 gap-4">
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">DA Name</span>
            <span className="font-medium text-sm">{daInfo.full_name}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Mobile</span>
            <span className="font-medium text-sm">{daInfo.mobile_number}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Type</span>
            <span className="font-medium text-sm">{daInfo.user_type}</span>
          </p>
          <p className="flex flex-col gap-1 self-center">
            <span className="font-medium text-sm">
              <UserStatusTag status={daInfo.status.toString() as string} />
            </span>
          </p>
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
