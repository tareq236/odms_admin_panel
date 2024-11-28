"use client";

import Card from "@/components/home/Card";
import { useAuthContext } from "@/contexts/AuthProvider";
import { rdl_admin_user_list } from "@prisma/client";
import { ListTodo, Route, Truck, UserRoundPen } from "lucide-react";
import React, { useEffect } from "react";

export default function Header({ user }: { user: rdl_admin_user_list }) {
  const { auth, onAuth } = useAuthContext();

  useEffect(() => {
    onAuth(user);
  }, [auth]);

  return (
    <section className="mb-6">
      <h2 className="text-foreground text-lg">
        Welcome, <strong>{auth?.full_name}</strong>
      </h2>
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
            href="/admin/delivery/invoice"
            title="Delivery"
            icon={<Truck className="size-5" />}
          />
        </div>
      </section>
    </section>
  );
}
