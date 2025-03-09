import React from "react";

function UserStatusTag({ status }: { status: "0" | "1" | string }) {
  return status == "0" ? (
    <div className="w-fit px-4 py-0.25 bg-yellow-200 text-yellow-800 text-center rounded-full text-[11px] font-semibold">In active</div>
  ) : (
    <div className="w-fit px-4 py-0.25 bg-green-200 text-emerald-800 text-center rounded-full text-[11px] font-semibold">Active</div>
  );
}

export default UserStatusTag;
