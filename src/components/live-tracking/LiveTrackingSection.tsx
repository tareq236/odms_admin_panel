"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { socket } from "@/lib/socketIo";

const LiveTrackingSection = () => {
  const [userLocations, setUserLocations] = useState<any>();
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  useEffect(() => {
    socket.on("coordinatesResultAndroid", (data) => {
      const { user_details, location } = data.result;
      setUserLocations((prevUserLocations: any) => ({
        ...prevUserLocations,
        [user_details.sap_id]: {
          ...location,
          sap_id: user_details.sap_id,
          user_details,
        },
      }));
    });

    return () => {
      socket.off("coordinatesResultAndroid");
    };
  }, [socket]);

  const handleMarkerMouseOver = (location: any) => {
    console.log("Mouse over marker:", location);
    setSelectedMarker(location);
    setInfoWindowOpen(true);
  };

  const handleMarkerMouseOut = () => {
    console.log("Mouse out of marker");
    setInfoWindowOpen(false);
  };

  const getTransportationMode = (speed: number) => {
    if (speed < 2) {
      return "Stationary"; // Not moving
    } else if (speed < 6) {
      return "Walking";
    } else if (speed < 25) {
      return "Bicycling";
    } else if (speed < 60) {
      return "Motorbike/Scooter";
    } else if (speed < 120) {
      return "Car";
    } else {
      return "Highway Driving";
    }
  };

  return (
    <section className="my-6 rounded-lg overflow-hidden">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "600px" }}
          zoom={10}
          center={{ lat: 23.779831515814845, lng: 90.39441646685316 }} // Default center
        >
          {userLocations != undefined &&
            Object.entries(userLocations).map(([sapId, location]: any) => (
              <Marker
                key={sapId}
                position={{ lat: location?.latitude, lng: location?.longitude }}
                label={sapId}
                onMouseOver={() => handleMarkerMouseOver(location)}
                onMouseOut={handleMarkerMouseOut}
              />
            ))}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <div>
                  <strong>User Details:</strong>{" "}
                  {selectedMarker.user_details.full_name}
                </div>
                <div>
                  <strong>Speed:</strong>{" "}
                  {Number(selectedMarker.speed).toFixed(2)} km/h
                </div>
                <div>
                  <strong>Transportation Mode:</strong>{" "}
                  {getTransportationMode(selectedMarker.speed)}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </section>
  );
};

export default LiveTrackingSection;
