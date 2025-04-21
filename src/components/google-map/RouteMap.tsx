"use client";

import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { MapPinCheckInside, MapPinPlusInside, Ruler } from "lucide-react";

export default function RouteMap({
  startLat,
  startLng,
  endLat,
  endLng,
}: {
  startLat: number;
  startLng: number;
  endLat?: number;
  endLng?: number;
}) {
  const position = { lat: startLat, lng: startLng };

  return (
    <div className="w-[100%] aspect-square md:aspect-video">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
        language="en"
        region="bd"
      >
        <Map
          defaultCenter={position}
          defaultZoom={15}
          fullscreenControl={false}
          disableDefaultUI={true}
        >
          
          {endLat && endLng ? (
            <Directions
              startLat={startLat}
              startLng={startLng}
              endLat={endLat}
              endLng={endLng}
            />
          ) : (
            <Marker position={{ lat: startLat, lng: startLng }} />
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

const Directions = ({
  startLat,
  startLng,
  endLat,
  endLng,
}: {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}) => {
  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
  const [dircetionService, setDirectionService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routeLibrary || !map) return;
    setDirectionService(new routeLibrary.DirectionsService());
    setDirectionsRenderer(new routeLibrary.DirectionsRenderer({ map }));
  }, [routeLibrary, map, startLat]);

  useEffect(() => {
    if (!dircetionService || !directionsRenderer) return;

    dircetionService
      .route({
        origin: { lat: startLat, lng: startLng },
        destination: { lat: endLat, lng: endLng },
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [dircetionService, directionsRenderer, startLat, startLng]);

  if (!leg) return null;

  return (
    <>
      <div className="absolute top-2 bg-white/90 px-4 py-2 right-2 left-2 md:right-12 md:left-12 text-sm flex flex-wrap justify-center gap-2 md:gap-5 rounded-full border border-primary">
        <h2>{selected.summary}</h2>
        <div className="flex items-center gap-2">
          <MapPinPlusInside className="size-4 text-primary" />{" "}
          <span>{leg.start_address.split(",")[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinCheckInside className="size-4 text-primary" />{" "}
          <span>{leg.end_address.split(",")[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          <Ruler className="size-4 text-primary" />{" "}
          <span>{leg.distance?.text}</span>
        </div>
      </div>
    </>
  );
};
