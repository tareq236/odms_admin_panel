import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/sidenav/Sidebar";
import SocketProvider from "@/contexts/SocketProvider";
import { getUser } from "@/lib/dal";
import { rdl_admin_user_list_role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (user == null) return redirect("/login");

  return (
    <SocketProvider>
      <div className="relative min-h-screen md:flex">
        {/* sidebar */}
        <aside className="hidden min-h-screen h-full bg-white border-r md:block md:sticky top-0 left-0 md:min-w-[15rem] z-20">
          <Sidebar userRole={user.role as rdl_admin_user_list_role} />
        </aside>

        <div className="w-full md:w-[calc(100%-15rem)]">
          <Nav user={user} />
          <main className="container py-6 w-full">{children}</main>
        </div>
      </div>
    </SocketProvider>
  );
}
