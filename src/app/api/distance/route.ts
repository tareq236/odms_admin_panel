import { NextResponse } from "next/server";

// API Route Handler for Distance Matrix
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const origins = searchParams.get("origins");
  const destinations = searchParams.get("destinations");
  const NEXT_PUBLIC_GOOGLE_MAP_API = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  if (!origins || !destinations) {
    return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${NEXT_PUBLIC_GOOGLE_MAP_API}`;
    const response = await fetch(url);
    const data = await response.json()

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error fetching data", details: error.message }, { status: 500 });
  }
}