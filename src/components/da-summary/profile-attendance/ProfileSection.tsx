import NoData from "@/components/constants/NoData";
import UserStatusTag from "@/components/user/UserStatusTag";
import { rdl_users_list } from "@/prisma/generated/client1";
import React, { ReactNode } from "react";

function ProfileSection({
  daInfo,
  daRoute,
}: {
  daInfo: rdl_users_list;
  daRoute: any[];
}) {
  const routeName = daRoute
    ? daRoute.map((item) => item.description).join("; ")
    : "-";

  return (
    <div className="border rounded p-4">
      <h2 className="text-foreground font-semibold mb-5 text-lg">
        Profile Information
      </h2>
      {daInfo != null ? (
        <article className="flex items-center justify-between flex-wrap gap-4">
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
        <NoData message="No DA found" />
      )}
    </div>
  );
}

export default ProfileSection;

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
