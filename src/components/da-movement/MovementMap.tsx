"use client";

import { user_movement } from "@/prisma/generated/client2";
import {
  GoogleMap,
  Polyline,
  useJsApiLoader,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { formatDate, formatNumber } from "@/lib/formatters";
import { useSearchParams } from "next/navigation";
import { format, toZonedTime } from "date-fns-tz";

export default function MovementMap({
  locations,
}: {
  locations: user_movement[];
}) {
  const [data, setData] = useState<user_movement[]>([]);
  const [center, setCenter] = useState({
    lat: Number(locations[0].latitude),
    lng: Number(locations[0].longitude),
  });

  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [map, setMap] = React.useState<any>(null);

  const searchParams = useSearchParams();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
  });

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      setData(locations);
      setCenter({
        lat: Number(locations[0].latitude),
        lng: Number(locations[0].longitude),
      });
    } else {
      setData(locations);
    }
  }, [searchParams]);

  // Function to create markers for clustering
  const createMarkers = (): any => {
    return data.map((location) => ({
      position: {
        lat: Number(location.latitude),
        lng: Number(location.longitude),
      },
      title: location.id,
      ...location,
    }));
  };

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center min-h-40">
        <Spinner borderBottomColor="border-b-primary" />
      </div>
    );

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          aspectRatio: 16 / 8,
        }}
        center={center}
        zoom={18}
      >
        {/* Add other map elements here */}
        {data.length > 0 && (
          <Polyline
            path={data.map((item) => {
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

        {/* Marker Clusterer component */}
        <MarkerClusterer
          options={{
            imagePath:
              "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
          }}
        >
          {(clusterer) =>
            createMarkers().map((marker: any, index: number) => (
              <Marker
                key={index}
                position={marker.position}
                label={{
                  text: `${index + 1}`,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                clusterer={clusterer} // Attach to the clusterer
                onClick={() => setSelectedData(marker)}
              />
            ))
          }
        </MarkerClusterer>

        {selectedData && (
          <InfoWindow
            position={{
              lat: Number(selectedData.latitude),
              lng: Number(selectedData.longitude),
            }}
            onCloseClick={() => setSelectedData(null)} // Clear selection on close
          >
            <div>
              <h5 className="text-md font-semibold mb-3">Stay Point Info</h5>
              <div className="flex flex-col gap-1 font-normal">
                <p>
                  Date:{" "}
                  {selectedData && selectedData.mv_date
                    ? formatDate(selectedData.mv_date)
                    : null}
                </p>
                {selectedData &&
                  selectedData.start_time &&
                  selectedData.end_time && (
                    <div>
                      Time:{" "}
                      {format(
                        toZonedTime(selectedData?.start_time, "UTC"),
                        "h:mm aaa"
                      )}{" "}
                      -{" "}
                      {format(
                        toZonedTime(selectedData?.end_time, "UTC"),
                        "h:mm aaa"
                      )}
                    </div>
                  )}

                {selectedData && selectedData?.time_in_minutes && (
                  <div className="">
                    Duration:{" "}
                    {formatNumber(Number(selectedData?.time_in_minutes ?? 0))}{" "}
                    mins
                  </div>
                )}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
