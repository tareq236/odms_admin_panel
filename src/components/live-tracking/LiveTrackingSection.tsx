"use client";

import React, { useState, useEffect } from "react";
import { socket } from "@/lib/socketIo";
import { usePathname, useSearchParams } from "next/navigation";
import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import { AuthUserProps } from "@/app/admin/route/page";

const LiveTrackingSection = ({ authUser }: { authUser: AuthUserProps }) => {
  const [userLocations, setUserLocations] = useState<any>();
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const findDepotUser = async (daCode: string) => {
    const isDepotUser = await fetch(
      `/api/live-tracking?q=${daCode}&depot=${authUser?.depot_code}`
    );

    if (isDepotUser.ok) return true;
    return false;
  };

  const handleSocket = () => {
    socket.on("coordinatesResultAndroid", async (data) => {
      const { user_details, location } = data.result;

      console.log(data.result)

      if (authUser.role === "admin") {
        if (searchParams.has("q")) {
          if (user_details.sap_id == searchParams.get("q")) {
            setUserLocations((prevUserLocations: any) => ({
              [searchParams.get("q") as string]: {
                ...location,
                sap_id: searchParams.get("q"),
                user_details,
              },
            }));
          }
        } else {
          setUserLocations((prevUserLocations: any) => ({
            ...prevUserLocations,
            [user_details.sap_id]: {
              ...location,
              sap_id: user_details.sap_id,
              user_details,
            },
          }));
        }
      } else {
        const isDepotUser = await findDepotUser(user_details.sap_id);
        console.log(isDepotUser)
        if (isDepotUser) {
          if (searchParams.has("q")) {
            if (user_details.sap_id == searchParams.get("q")) {
              setUserLocations((prevUserLocations: any) => ({
                [searchParams.get("q") as string]: {
                  ...location,
                  sap_id: searchParams.get("q"),
                  user_details,
                },
              }));
            }
          } else {
            setUserLocations((prevUserLocations: any) => ({
              ...prevUserLocations,
              [user_details.sap_id]: {
                ...location,
                sap_id: user_details.sap_id,
                user_details,
              },
            }));
          }
        }
      }
    });

    return () => {
      socket.off("coordinatesResultAndroid");
    };
  };

  useEffect(() => {
    handleSocket()
  }, [socket, pathname, searchParams]);

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
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
        <Map
          style={{ width: "100%", height: "100vh" }}
          defaultCenter={{ lat: 23.779831515814845, lng: 90.39441646685316 }}
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          fullscreenControl={false}
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
        </Map>
      </APIProvider>
    </section>
  );
};

export default LiveTrackingSection;
