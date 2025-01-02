import React from "react";
import db2 from "../../../db/db2";
import { user_movement } from "@/prisma/generated/client2";
import { UserRoundX } from "lucide-react";
import MovementMap from "./MovementMap";
import { formateDateDB } from "@/lib/formatters";

export default async function MapSection({
  searchParams,
}: {
  searchParams: { q: string; start: string; p: string };
}) {
  let data: user_movement[] = [];
  let count = 0;
  const date = `${
    searchParams.start ? searchParams.start : formateDateDB(new Date())
  }`;

  try {
    data = await db2.$queryRaw`
        WITH stay_points AS (
    SELECT
        user_id,
        mv_date,
        ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) AS geo_point,
        mv_time,
        LEAD(mv_time) OVER (PARTITION BY user_id ORDER BY mv_time) AS next_time
    FROM user_movement
    WHERE user_id = ${searchParams.q} AND mv_date = ${
      searchParams?.start ?? formateDateDB(new Date())
    }::DATE
),
clusters AS (
    SELECT
        sp.user_id,
        sp.mv_date,
        sp.geo_point,
        sp.mv_time,
        sp.next_time,
        ST_DWithin(sp.geo_point, LEAD(sp.geo_point) OVER (PARTITION BY sp.user_id ORDER BY sp.mv_time), 10) AS within_radius,
        EXTRACT(EPOCH FROM (sp.next_time - sp.mv_time)) AS time_diff_seconds
    FROM stay_points sp
),
filtered_stays AS (
    SELECT
        user_id,
        geo_point,
        mv_date,
        SUM(time_diff_seconds) AS total_time_seconds,
        SUM(time_diff_seconds) / 60 AS total_time_minutes -- Convert seconds to minutes
    FROM clusters
    WHERE within_radius
    GROUP BY user_id, geo_point, mv_date
    HAVING SUM(time_diff_seconds) >= 300 -- 5 minutes
)
SELECT
    user_id,
    mv_date,
    ST_X(geo_point) AS longitude,
    ST_Y(geo_point) AS latitude,
    total_time_seconds AS time_in_seconds,
    total_time_minutes AS time_in_minutes
FROM filtered_stays;
    `;
  } catch (error) {
    console.log(error);
  }

  if (data.length === 0)
    return (
      <div className="flex items-center justify-center flex-col  text-muted-foreground/50 my-20">
        <UserRoundX className="size-16" />
        <p className="text-xs">User was absent</p>
      </div>
    );

  return (
    <section>
      {/* {JSON.stringify(data, null, 2)} */}
      <MovementMap locations={data} />
    </section>
  );
}
