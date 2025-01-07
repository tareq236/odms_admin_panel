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
import React, { useEffect, useRef, useState } from "react";
import Spinner from "../ui/Spinner";
import { formatDate, formatDateTime, formatNumber } from "@/lib/formatters";
import { useSearchParams } from "next/navigation";
import { format, toZonedTime } from "date-fns-tz";

export default function MovementMap({
  locations,
  deliveryList,
  routeData
}: {
  locations: user_movement[];
  routeData: user_movement[];
  deliveryList: any[];
}) {
  const [data, setData] = useState<user_movement[]>([]);
  const [center, setCenter] = useState({
    lat: Number(locations[0].latitude),
    lng: Number(locations[0].longitude),
  });

  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedDeliveryData, setSelectedDeliveryData] = useState<any | null>(
    null
  );
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef<google.maps.Map | null>(null);

  const searchParams = useSearchParams();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
  });

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

  // Function to create markers for clustering
  const createDeliveryMarkers = (): any => {
    return deliveryList.map((location) => ({
      position: {
        lat: Number(location.delivery_latitude),
        lng: Number(location.delivery_longitude),
      },
      title: location.id,
      ...location,
    }));
  };

  const onZoomChanged = (): void => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom() || 8); // Fallback to 8 if getZoom returns null
    }
  };

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map; // Store the map instance
  };

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center min-h-40">
        <Spinner borderBottomColor="border-b-primary" />
      </div>
    );

  return (
    <div>
      {JSON.stringify(routeData.length)} <br />
      {JSON.stringify(data.length)}
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          aspectRatio: 16 / 8,
        }}
        center={center}
        zoom={zoom}
        onZoomChanged={onZoomChanged}
        onLoad={onLoad}
      >
        {/* Add other map elements here */}
        {routeData  && routeData.length > 0 && (
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
        {zoom < 20 ? (
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
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  icon={
                    index !== 0
                      ? {
                          url: `https://maps.google.com/mapfiles/ms/icons/yellow-dot.png`,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }
                      : undefined
                  }
                  clusterer={clusterer} // Attach to the clusterer
                  onClick={() => setSelectedData(marker)}
                />
              ))
            }
          </MarkerClusterer>
        ) : (
          data.map((item, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              }}
              label={{
                text: `${index + 1}`,
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              icon={
                index !== 0
                  ? {
                      url: `https://maps.google.com/mapfiles/ms/icons/yellow-dot.png`,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }
                  : undefined
              }
              onClick={() => setSelectedData(item)}
            />
          ))
        )}

        {/* delivery */}
        {deliveryList &&
          deliveryList.length > 0 &&
          deliveryList.map((item, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(item.delivery_latitude),
                lng: Number(item.delivery_longitude),
              }}
              label={{
                text: `${index + 1}`,
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              icon={{
                url: `https://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => setSelectedDeliveryData(item)}
            />
          ))}

        {/* cash collection */}
        {deliveryList &&
          deliveryList.length > 0 &&
          deliveryList
            .filter((delivery) => delivery.total_cash_collection > 0)
            .map((item, index) => (
              <Marker
                key={index}
                position={{
                  lat: Number(item.delivery_latitude),
                  lng: Number(item.delivery_longitude),
                }}
                label={{
                  text: `${index + 1}`,
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                icon={{
                  url: `https://maps.google.com/mapfiles/ms/icons/green-dot.png`,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => setSelectedDeliveryData(item)}
              />
            ))}

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

        {selectedDeliveryData && (
          <InfoWindow
            position={{
              lat: Number(selectedDeliveryData.delivery_latitude),
              lng: Number(selectedDeliveryData.delivery_longitude),
            }}
            onCloseClick={() => setSelectedDeliveryData(null)}
          >
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-sm">
                {selectedDeliveryData.total_cash_collection > 0
                  ? "Cash Collection Info"
                  : "Delivery Info"}
              </h2>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-xs font-normal">
                  <span>Total Invoice:</span>
                  <span>{Number(selectedDeliveryData.total_bill)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-normal">
                  <span>Total Amount:</span>
                  <span>
                    {formatNumber(Number(selectedDeliveryData.total_net_val))}
                  </span>
                </div>
                {selectedDeliveryData.total_cash_collection > 0 && (
                  <div className="flex items-center gap-1 text-xs font-normal">
                    <span>Total Collection:</span>
                    <span>
                      {formatNumber(
                        Number(selectedDeliveryData.total_cash_collection)
                      )}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs font-normal">
                  <span>Partner:</span>
                  <span>{selectedDeliveryData.partner}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-normal">
                  <span>Time:</span>
                  <span>
                    {formatDateTime(selectedDeliveryData.delivery_date_time)}
                  </span>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
