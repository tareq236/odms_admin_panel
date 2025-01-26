import PartnerStatsSection from "@/components/partner-delivery/PartnerStatsSection";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Delivery - ODMS Admin Panel",
};

export default function PartnerDeliveryAnalyticsPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; sorting: string };
}) {
  return <PartnerStatsSection searchParams={searchParams} />;
}
