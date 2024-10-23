import PartnerStatsSection from "@/components/partner-delivery/PartnerStatsSection";
import React from "react";

function PartnerDeliveryAnalyticsPage({
  searchParams,
}: {
  searchParams: { p: string; q: string; sorting: string };
}) {
  return (
    <>
      <PartnerStatsSection searchParams={searchParams} />
    </>
  );
}

export default PartnerDeliveryAnalyticsPage;
