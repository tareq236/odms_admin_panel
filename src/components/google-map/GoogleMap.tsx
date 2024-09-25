"use client";

import middleware from "@/middleware";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function GoogleMap({
  latitude,
  longitude,
  endLat,
  endLng,
  defaultZoom=15
}: {
  longitude: number;
  latitude: number;
  endLat?: number;
  endLng?: number;
  defaultZoom?: number
}) {
  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
        <Map
          style={{ width: "100%", minHeight: "10rem", height: "13.5rem" }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={defaultZoom}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          fullscreenControl={false}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
          {endLat != null && endLng != null && (
            <Marker position={{ lat: endLat, lng: endLng }} />
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

export default GoogleMap;
