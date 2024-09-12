import Card from "@/components/home/Card";
import { getUser } from "@/lib/dal";
import { ListTodo, Route, Truck, UserRoundPen } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function Header() {

    const user = await getUser()

    if(user == null) {
      redirect('/login')
    }

  return (
    <section className="mb-6">
      <h2 className="text-foreground text-lg">Welcome, <strong>{user?.full_name}</strong></h2>
      <h5 className="text-xs text-gray-500">Let&apos;s explore</h5>
      <section className="my-5">
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
            href="/admin/delivery"
            title="Delivery"
            icon={<Truck className="size-5" />}
          />
        </div>
      </section>
    </section>
  );
}

