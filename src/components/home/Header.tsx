import Card from "@/components/home/Card";
import { verifyAuthuser } from "@/lib/dal";
import { titleCase } from "@/lib/formatters";
import { odmsPanelAdminPermission } from "@/lib/permissions";
import { ListTodo, Route, Truck, UserRoundPen } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function Header() {
  const user = await verifyAuthuser();

  if (!user) redirect("/login");

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center gap-5">
        <div className="">
          <h2 className="text-foreground text-lg">
            Welcome, <strong>{user?.name}</strong>
          </h2>
          <h5 className="text-xs text-gray-500">Let&apos;s explore</h5>
        </div>
        <div className="flex items-center gap-10">
          <div className={user.depot ? "text-center" : "text-right"}>
            <h5 className="text-xs text-gray-500">Role</h5>
            <h4 className="text-xs text-foreground">
              {titleCase(user.role || "")}
            </h4>
          </div>
        </div>
      </div>
      <section className="my-5">
        {odmsPanelAdminPermission(user) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <Card
              href="/admin/user/management"
              title="Management"
              icon={<UserRoundPen className="size-5" />}
            />
            <Card
              href="/admin/user/attendance"
              title="Attendance"
              icon={<ListTodo className="size-5" />}
            />

            <Card
              href="/admin/route"
              title="Route"
              icon={<Route className="size-5" />}
            />
            <Card
              href="/admin/delivery/invoice"
              title="Delivery"
              icon={<Truck className="size-5" />}
            />
          </div>
        )}
      </section>
    </section>
  );
}
