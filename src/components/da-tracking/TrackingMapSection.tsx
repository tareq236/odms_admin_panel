"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref, onValue } from "firebase/database";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NoData from "../constants/NoData";
import Spinner from "../ui/Spinner";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
  authDomain: "realtime-tracking-e36dc.firebaseapp.com",
  databaseURL:
    "https://realtime-tracking-e36dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-tracking-e36dc",
  storageBucket: "realtime-tracking-e36dc.appspot.com",
  messagingSenderId: "32036302829",
  appId: "1:32036302829:web:a8d925481a5e638e6901e4",
  measurementId: "G-VT8824KVFE",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function TrackingMapSection() {
  const [daData, setDaData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any>();
  const searchParams = useSearchParams();

  // const fetchData = async (sap_id: string) => {
  //   setLoading(true);
  //   try {
  //     const snapshot = await get(
  //       ref(database, `current_coordinates/${sap_id}`)
  //     );
  //     const data = snapshot.val();

  //     console.log(data);

  //     if (data) {
  //       setDaData(data);
  //     } else {
  //       setDaData(null);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data from Firebase:", error);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    try {
      setLoading(true);
      const query = ref(
        database,
        `current_coordinates/${searchParams.get("q")}`
      );
      return onValue(query, (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
          setDaData(data);
          setProjects(data);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Spinner borderBottomColor="border-b-primary" className="size-14" />
      </div>
    );

  return (
    <div className="w-full aspect-[16/7]">
      <h4 className="text-muted-foreground mb-3">Map</h4>
      {daData ? (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{
              lat: daData ? daData?.location.latitude : 23.45,
              lng: daData ? daData?.location.longitude : 90.22,
            }}
            center={{
              lat: daData ? daData?.location.latitude : 23.45,
              lng: daData ? daData?.location.longitude : 90.22,
            }}
            defaultZoom={14}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            fullscreenControl={false}
          >
            <Marker
              position={{
                lat: daData ? daData?.location.latitude : 23.45,
                lng: daData ? daData?.location.longitude : 90.22,
              }}
            />
          </Map>
        </APIProvider>
      ) : (
        <div className="my-20">
          <NoData />
        </div>
      )}
    </div>
  );
}
