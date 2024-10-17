import NoData from "@/components/constants/NoData";
import UserStatusTag from "@/components/user/UserStatusTag";
import { rdl_user_list } from "@prisma/client";
import React from "react";

export default async function DaInfoSection({
  daInfo,
}: {
  daInfo: rdl_user_list;
}) {
  return (
    <section>
      <h2 className="h2">Delivery Assistant Information</h2>
      {daInfo != null ? (
        <article className="grid grid-cols-4 gap-4">
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
          <div className="flex flex-col gap-1 self-center">
            <span className="text-xs text-muted-foreground">Status</span>
            <span className="font-medium text-sm">
              <UserStatusTag status={daInfo.status.toString() as string} />
            </span>
          </div>
        </article>
      ) : (
        <NoData />
      )}
    </section>
  );
}
