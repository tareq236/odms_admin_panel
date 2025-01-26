import TrackingMapSection from "@/components/da-tracking/TrackingMapSection";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import React, { Suspense } from "react";
import SearchDa from "@/components/constants/SearchDa";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import Header from "@/components/da-tracking/Header";
import type { Metadata } from "next";
import NoData from "@/components/constants/NoData";
import { getDaInfo } from "../_actions/daInfo";

export const metadata: Metadata = {
  title: "DA Tracking - ODMS Admin Panel",
};

async function DaTrackingPage({
  searchParams,
}: {
  searchParams: { q: string; start: string; p: string };
}) {
  const user = await getUser();

  if (!user) redirect("/login");

  const { daInfo, isDepotDA } = await getDaInfo({
    searchParams: searchParams,
    user: user,
  });

  return (
    <>
      <Header />

      {searchParams.q ? (
        user.role == "admin" || (isDepotDA && isDepotDA.length > 0) ? (
          <Suspense>
            <DaInfoSection searchParams={searchParams} />
            {daInfo && <TrackingMapSection />}
          </Suspense>
        ) : (
          <NoData message="No DA found" />
        )
      ) : (
        <section className="py-10 border-t">
          <SearchDa />
        </section>
      )}
    </>
  );
}

export default DaTrackingPage;
