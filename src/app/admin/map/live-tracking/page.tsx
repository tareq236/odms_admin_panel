import Header from "@/components/live-tracking/Header";
import LiveTrackingSection from "@/components/live-tracking/LiveTrackingSection";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Tracking - ODMS Admin Panel",
};

export default function LiveTrackingPage() {
  return (
    <>
      <Header />
      <LiveTrackingSection />
    </>
  );
}
