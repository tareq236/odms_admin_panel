"use client";

import React, { useEffect } from "react";
import { APIProvider, Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";

function GoogleMap({latitude, longitude}: {longitude: number, latitude: number}) {
  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);
  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
        <Map
          style={{ width: "100%", height: "10rem" }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          center={{lat: latitude, lng: longitude}}
        >
          <Marker ref={markerRef} position={{lat: latitude, lng: longitude}} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default GoogleMap;
