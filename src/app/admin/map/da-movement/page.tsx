import FilterSection from "@/components/da-movement/FilterSection";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import PageHeader from "@/components/ui/PageHeader";
import { MapPinned } from "lucide-react";
import React, { Suspense } from "react";
import SearchDa from "@/components/constants/SearchDa";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import type { Metadata } from "next";
import MapSection from "@/components/da-movement/MapSection";
import Spinner from "@/components/ui/Spinner";
import NoData from "@/components/constants/NoData";
import { getDaInfo } from "../_actions/daInfo";

export const metadata: Metadata = {
  title: "DA Movement - ODMS Admin Panel",
};

export default async function DaMovementAnalyticsPage({
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
      <PageHeader
        title="DA Movement"
        icon={<MapPinned className="size-5 fill-primary/20" />}
      />

      <FilterSection />

      {searchParams.q ? (
        user.role == "admin" || (isDepotDA && isDepotDA.length > 0) ? (
          <Suspense>
            <DaInfoSection searchParams={searchParams} />
            {daInfo && (
              <Suspense fallback={<Spinner />}>
                <MapSection searchParams={searchParams} />
              </Suspense>
            )}
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
