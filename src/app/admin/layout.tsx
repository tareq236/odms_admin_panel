import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/sidenav/Sidebar";
import { AuthProvider } from "@/contexts/AuthProvider";
import SocketProvider from "@/contexts/SocketProvider";
import React from "react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SocketProvider>
        <div className="relative min-h-screen md:flex">
          {/* sidebar */}
          <aside className="hidden min-h-screen h-full bg-white border-r md:block md:sticky top-0 left-0 md:min-w-[15rem] z-20">
            <Sidebar />
          </aside>

          <div className="w-full md:w-[calc(100%-15rem)]">
            <Nav />
            <main className="container py-6 w-full">{children}</main>
          </div>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}
