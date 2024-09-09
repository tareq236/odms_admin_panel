"use client";

import React, { useEffect } from "react";
import { APIProvider, Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";

function GoogleMap() {
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
          style={{ width: "50vw", height: "100vh" }}
          defaultCenter={{ lat: 24.89, lng: 91.8 }}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker ref={markerRef} position={{lat: 24.89, lng: 91.8}} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default GoogleMap;
