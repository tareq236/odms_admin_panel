"use client";

import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import Spinner from "../ui/Spinner";

export default function RouteMap({
  startLat,
  startLng,
  data,
  loading,
}: {
  startLat: number;
  startLng: number;
  data?: any[];
  loading: boolean;
}) {
  const [center, setCenter] = useState({
    lat: Number(startLat),
    lng: Number(startLng),
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map; // Store the map instance
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
  });

  if (!isLoaded || loading)
    return (
      <div className="flex justify-center items-center min-h-40">
        <Spinner className="size-20" borderBottomColor="border-b-primary" />
      </div>
    );

  return (
    <div className="w-full aspect-square md:aspect-video min-h-full">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        zoom={17}
        center={center}
        onLoad={onLoad}
      >
        {/* Add other map elements here */}
        {data &&
          (data as any[]).length > 0 &&
          (data as any).map((item: any, index: number) => (
            <Marker
              key={index}
              position={{
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              }}
              label={{
                text: `${index + 1}`,
                color:
                  index == 0
                    ? "white"
                    : index + 1 == (data as any[]).length
                    ? "white"
                    : "black",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              icon={{
                url: `https://maps.google.com/mapfiles/ms/icons/${
                  index == 0
                    ? "red"
                    : index + 1 == (data as any[]).length
                    ? "blue"
                    : "yellow"
                }-dot.png`,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}

        {data && (data as any[]).length > 0 && (
          <Polyline
            path={(data as any[]).map((item) => {
              return {
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              };
            })}
            options={{
              strokeColor: "#0000FF", // Color of the street line
              strokeOpacity: 0.8,
              strokeWeight: 4, // Line thickness
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
