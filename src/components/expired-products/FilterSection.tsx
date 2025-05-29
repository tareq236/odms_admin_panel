import React from "react";
import SelectDepot from "../filter/SelectDepot";
import SelectDepotDA from "../filter/SelectDepotDA";
import { SearchParams } from "@/types/params";
import { AuthUser } from "@/types/AuthUser";

export default function FilterSection({
  searchParams,
  user,
}: {
  user: AuthUser;
  searchParams: SearchParams;
}) {
  const { depot } = searchParams;

  let validateDepot = depot;

  if (user.role === "depot") {
    validateDepot = user.depot as string;
  }

  return (
    <section className="flex gap-x-5 gap-y-3 flex-wrap w-full xl:w-1/2 justify-end">
      {user.role === "admin" && <SelectDepot />}
      <SelectDepotDA depotCode={validateDepot as string} />
    </section>
  );
}
