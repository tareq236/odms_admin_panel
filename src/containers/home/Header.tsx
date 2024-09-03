import Card from "@/components/home/Card";
import { getUser } from "@/lib/dal";
import { deleteSession } from "@/lib/session";
import { ListTodo, Route, Truck, UserRoundPen } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function Header() {

    const user = await getUser()

    if(user == null) {
        deleteSession()
        redirect('/login')
    }

  return (
    <section className="mb-6">
      <h2 className="text-foreground text-lg">Welcome, <strong>{user.full_name}</strong></h2>
      <h5 className="text-xs text-gray-500">Let's explore</h5>
      <section className="my-5">
        <div className="flex gap-3 flex-wrap">
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

