import LiveTrackingSection from "@/components/live-tracking/LiveTrackingSection";
import PageHeader from "@/components/ui/PageHeader";
import { Footprints } from "lucide-react";
import React from "react";

export default function LiveTrackingPage() {
  return (
    <>
      <PageHeader
        title="Live Tracking"
        icon={<Footprints className="size-5 fill-primary/20" />}
      />

      <LiveTrackingSection />
    </>
  );
}
