import React from "react";
import db2 from "../../../db/db2";
import { user_movement } from "@/prisma/generated/client2";
import { UserRoundX } from "lucide-react";
import MovementMap from "./MovementMap";
import { formateDateDB } from "@/lib/formatters";
import { rdl_delivery } from "@/prisma/generated/client1";
import db from "../../../db/db";

export default async function MapSection({
  searchParams,
}: {
  searchParams: { q: string; start: string; p: string };
}) {
  let data: user_movement[] | unknown = [];
  const date = `${
    searchParams.start ? searchParams.start : formateDateDB(new Date())
  }`;
  let deliveryData: rdl_delivery[] | unknown = [];

  try {
    [data, deliveryData] = await Promise.all([
      db2.$queryRaw`
    WITH stay_points AS (
        SELECT
            user_id, -- ID of the user
            mv_date, -- Date of movement
            ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) AS geo_point, -- Create a geographic point from longitude and latitude
            mv_time, -- Movement time for the current record
            LEAD(mv_time) OVER (PARTITION BY user_id ORDER BY mv_time) AS next_time -- Time of the next movement for the same user
        FROM user_movement
        WHERE user_id = ${searchParams.q} AND mv_date = ${
        searchParams?.start ?? formateDateDB(new Date())
      }::DATE
    ),
    clusters AS (
        SELECT
            sp.user_id, -- User ID
            sp.mv_date, -- Movement date
            sp.geo_point, -- Geographic point of the current record
            sp.mv_time, -- Movement time of the current record
            sp.next_time, -- Movement time of the next record
            ST_DWithin(sp.geo_point, LEAD(sp.geo_point) OVER (PARTITION BY sp.user_id ORDER BY sp.mv_time), 10) AS within_radius, -- Check if the next point is within 10 meters
            EXTRACT(EPOCH FROM (sp.next_time - sp.mv_time)) AS time_diff_seconds -- Calculate time difference in seconds
        FROM stay_points sp
    ),
    filtered_stays AS (
        SELECT
            user_id, -- User ID
            geo_point, -- Geographic point representing the cluster
            mv_date, -- Movement date
            MIN(mv_time) AS start_time, -- Start time of the stay
            MAX(next_time) AS end_time, -- End time of the stay
            SUM(time_diff_seconds) AS total_time_seconds, -- Total time spent at this location in seconds
            SUM(time_diff_seconds) / 60 AS total_time_minutes -- Total time spent at this location in minutes
        FROM clusters
        WHERE within_radius -- Filter for points that are within the specified radius
        GROUP BY user_id, geo_point, mv_date -- Group by user, geographic point, and date
        HAVING SUM(time_diff_seconds) >= 300 -- Retain clusters where total time spent is 5 minutes or more
    )
    SELECT
        user_id, -- User ID
        mv_date, -- Movement date
        ST_X(geo_point) AS longitude, -- Extract longitude from the geographic point
        ST_Y(geo_point) AS latitude, -- Extract latitude from the geographic point
        total_time_seconds AS time_in_seconds, -- Total time spent at the location in seconds
        total_time_minutes AS time_in_minutes, -- Total time spent at the location in minutes
        start_time, -- Start time of the stay
        end_time -- End time of the stay
    FROM filtered_stays;
    `,
      db.$queryRaw`
      SELECT rd.billing_date, SUM(rd.net_val) total_net_val,  count(rd.id) total_bill,
      rd.delivery_latitude, rd.delivery_longitude, rd.cash_collection_latitude, rd.cash_collection_longitude,
      SUM(rd.cash_collection) total_cash_collection, rd.partner
      FROM rdl_delivery rd
      WHERE rd.da_code=${searchParams.q} AND rd.billing_date=${date}
      GROUP BY rd.partner
      `,
    ]);
  } catch (error) {
    console.log(error);
  }

  if ((data as user_movement[]).length === 0)
    return (
      <div className="flex items-center justify-center flex-col  text-muted-foreground/50 my-20">
        <UserRoundX className="size-16" />
        <p className="text-xs">No user data found</p>
      </div>
    );

  return (
    <section>
      <MovementMap
        locations={data as user_movement[]}
        deliveryList={deliveryData as rdl_delivery[]}
      />
    </section>
  );
}
