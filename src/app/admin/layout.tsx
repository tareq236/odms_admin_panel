import Nav from "@/components/nav/Nav";
import Sidebar from "@/components/sidenav/Sidebar";
import React from "react";

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen md:flex">
      {/* sidebar */}
      <aside className="hidden min-h-screen h-full bg-white border-r md:block md:sticky top-0 left-0 min-w-[15rem] md:w-1/6 z-20">
        <Sidebar />
      </aside>

      <div className="w-full md:w-5/6">
        {/* nav */}
        {/* <Nav /> */}
        <main className="container py-6">{children}</main>
      </div>
    </div>
  );
}
