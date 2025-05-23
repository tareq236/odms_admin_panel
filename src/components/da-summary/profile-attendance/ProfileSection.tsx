import NoData from "@/components/constants/NoData";
import UserStatusTag from "@/components/user/UserStatusTag";
import { rdl_users_list } from "@/prisma/generated/client1";
import React from "react";

function ProfileSection({ daInfo }: { daInfo: rdl_users_list }) {
  return (
    <div className="border rounded p-4">
      <h2 className="text-foreground font-semibold mb-5 text-lg">
        Profile Information
      </h2>
      {daInfo != null ? (
        <article className="flex items-center justify-between flex-wrap gap-4">
          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">DA Name</span>
            <span className="font-medium text-sm">{daInfo.full_name}</span>
          </p>

          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Mobile</span>
            <span className="font-medium text-sm">{daInfo.mobile_number}</span>
          </p>

          <p className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Depot Name</span>
            <span className="font-medium text-sm">{daInfo.user_depot}</span>
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
        <NoData message="No DA found" />
      )}
    </div>
  );
}

export default ProfileSection;
