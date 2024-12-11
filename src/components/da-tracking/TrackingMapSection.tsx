"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref } from "firebase/database";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NoData from "../constants/NoData";

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
  const searchParams = useSearchParams();

  const fetchData = async (sap_id: string) => {
    setLoading(true);
    try {
      const snapshot = await get(ref(database, `coordinates/${sap_id}`));
      const data = snapshot.val();

      console.log(data);

      // {
      //   "dateTime": "2024-12-11 09:25:15",
      //   "location": {
      //     "accuracy": 17.527999877929688,
      //     "altitude": -28.200000762939453,
      //     "bearing": 0,
      //     "latitude": 23.4127091,
      //     "longitude": 89.002969,
      //     "speed": 0
      //   },
      //   "user_details": {
      //     "full_name": "Md. Humayun Kabir",
      //     "mobile_number": "01871002354",
      //     "sap_id": 50012,
      //     "user_type": "Delivery Assistant"
      //   }
      // }

      if (data) {
        setDaData(data);
      } else {
        setDaData(null);
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.has("q")) {
      fetchData(searchParams.get("q") || "");
    }
  }, [searchParams]);

  return (
    <div className="w-full aspect-video">
      {loading && "Loaddingg"}
      {daData && JSON.stringify(daData)}
      {daData ? (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
          <Map
            style={{ width: "100%", height: "100%" }}
            // defaultCenter={{ lat: latitude, lng: longitude }}
            defaultCenter={{
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
