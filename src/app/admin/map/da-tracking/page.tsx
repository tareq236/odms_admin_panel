import FilterSection from "@/components/da-tracking/FilterSection";
import TrackingMapSection from "@/components/da-tracking/TrackingMapSection";
import DaInfoSection from "@/components/delivery/collection/DaInfoSection";
import PageHeader from "@/components/ui/PageHeader";
import { MapPin } from "lucide-react";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import SearchDa from "@/components/constants/SearchDa";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import { formateDateDB } from "@/lib/formatters";

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
                depot_code =${user.deport_code}
        )
  `;

  return (
    <>
      <PageHeader
        title="DA Tracking"
        icon={<MapPin className="size-5 fill-primary/20" />}
      />

      <FilterSection />

      {isDepotDA && isDepotDA.length > 0 && searchParams.q ? (
        <Suspense>
          <DaInfoSection searchParams={searchParams} />
        </Suspense>
      ) : (
        <section className="py-10 border-t">
          <SearchDa />
        </section>
      )}
      {daInfo && <TrackingMapSection />}
    </>
  );
}

export default DaTrackingPage;
