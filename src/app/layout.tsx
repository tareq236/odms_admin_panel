import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import ProgressProvider from "@/contexts/ProgressProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ODMS - Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ProgressProvider>
          {children}
          <Toaster position='top-right' richColors closeButton />
        </ProgressProvider>
      </body>
    </html>
  );
}
