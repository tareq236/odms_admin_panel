import FilterSection from "@/components/da-tracking/FilterSection";
import TrackingMapSection from "@/components/da-tracking/TrackingMapSection";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import PageHeader from "@/components/ui/PageHeader";
import { MapPin } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import SearchDa from "@/components/constants/SearchDa";

async function DaTrackingPage({
  searchParams,
}: {
  searchParams: { q: string; start: string; p: string };
}) {
  let daInfo;
  try {
    daInfo = await db.rdl_user_list.findUnique({
      where: { sap_id: Number(searchParams.q || 0) },
    });
  } catch (error) {
    daInfo = null;
  }

  return (
    <>
      <PageHeader
        title="DA Tracking"
        icon={<MapPin className="size-5 fill-primary/20" />}
      />

      <FilterSection />

      {searchParams.q ? (
        <Suspense>
          <DaInfoSection searchParams={searchParams} />
        </Suspense>
      ): (
        <section className="py-10 border-t">
          <SearchDa />
        </section>
      )}
      {daInfo && <TrackingMapSection />}
    </>
  );
}

export default DaTrackingPage;
