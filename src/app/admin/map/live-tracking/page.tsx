import Header from "@/components/live-tracking/Header";
import LiveTrackingSection from "@/components/live-tracking/LiveTrackingSection";
import React from "react";
import type { Metadata } from "next";
import { getUser, verifyAuthuser } from "@/lib/dal";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Live Tracking - ODMS Admin Panel",
};

export default async function LiveTrackingPage() {
  const authUser = await verifyAuthuser();

  if (!authUser) return redirect("/login");

  return (
    <>
      <Header />
      <LiveTrackingSection authUser={authUser} />
    </>
  );
}
