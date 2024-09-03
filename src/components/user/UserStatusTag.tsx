import React from "react";

function UserStatusTag({ status }: { status: string }) {
  return status == "0" ? (
    <div className="px-1.5 py-1 bg-yellow-200 text-yellow-800 text-center rounded-full text-[11px] font-semibold">In active</div>
  ) : (
    <div className="px-1.5 py-1 bg-green-200 text-emerald-800 text-center rounded-full text-[11px] font-semibold">Active</div>
  );
}

export default UserStatusTag;
