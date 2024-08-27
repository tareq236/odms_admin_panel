import Nav from "@/components/admin/nav/Nav";
import Sidebar from "@/components/admin/nav/Sidebar";
import React from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen md:flex">
      {/* sidebar */}
      <aside className="hidden min-h-screen h-full border-r md:block md:sticky top-0 left-0 min-w-[15rem]">
        <Sidebar />
      </aside>

      <div className="w-full">
        {/* nav */}
        <Nav />
        <main className="container py-6">{children}</main>
      </div>
    </div>
  );
}
