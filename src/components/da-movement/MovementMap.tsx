"use client";

import { user_movement } from "@/prisma/generated/client2";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  useJsApiLoader,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { formatDate } from "@/lib/formatters";
import { useSearchParams } from "next/navigation";

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

  const [selectedData, setSelectedData] = useState<user_movement | null>(null);
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
              <h5>Cash Collection Details</h5>
              <p>
                Date Time:{" "}
                {selectedData && selectedData.mv_date
                  ? formatDate(selectedData.mv_date)
                  : null}
              </p>
              <div>Speed: {Number(selectedData?.speed)}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
