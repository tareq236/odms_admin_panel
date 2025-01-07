import TrackingMapSection from "@/components/da-tracking/TrackingMapSection";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import SearchDa from "@/components/constants/SearchDa";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import { formateDateDB } from "@/lib/formatters";
import Header from "@/components/da-tracking/Header";
import type { Metadata } from "next";
import NoData from "@/components/constants/NoData";

export const metadata: Metadata = {
  title: "DA Tracking - ODMS Admin Panel",
};

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

  const user = await getUser();

  if (!user) redirect("/login");

  const isDepotDA: any = await db.$queryRaw`
    select count(*) over () as total
    from
        rdl_delivery_info_sap as a
        LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
    WHERE
        a.billing_date = ${
          searchParams.start
            ? `${searchParams.start}`
            : `${formateDateDB(new Date())}`
        }
        AND a.da_code = ${Number(searchParams.q) || 0}
        AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
                depot_code =${user.depot_code}
        )
  `;

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
