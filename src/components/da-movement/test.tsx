"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

import moment from "moment";
import { useSearchParams } from "next/navigation";
import { CallApi } from "@/lib/api";
import { formateDateDB } from "@/lib/formatters";
import { toast } from "sonner";
import Spinner from "../ui/Spinner";
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

const TrackingMapSection = () => {
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [deliveryData, setDeliveryData] = useState([]);
  const [cashCollectionData, setCashCollectionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [stays, setStays] = useState<any[]>([]);
  const [selectedStay, setSelectedStay] = useState<any>(null);
  const [streetCoordinates, setStreetCoordinates] = useState<any[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [selectedCashCollection, setSelectedCashCollection] =
    useState<any>(null);

  const [noData, setNoData] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
  });

  const [map, setMap] = React.useState<any>(null);

  const searchParams = useSearchParams();

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const identifyStays = (locations: any[]) => {
    const stays = [];
    let currentStay: any[] = [];
    let lastLocation: any = null;

    locations.forEach((location) => {
      if (lastLocation) {
        const distance = calculateDistance(
          lastLocation?.lat,
          lastLocation?.lng,
          location.lat,
          location.lng
        );
        const timeDiff =
          (Number(new Date(location?.dateTime)) -
            Number(new Date(lastLocation.dateTime))) /
          1000 /
          60;

        if (distance <= 50 && timeDiff <= 5) {
          currentStay.push(location);
        } else if (currentStay.length > 0) {
          stays.push(currentStay);
          currentStay = [location];
        } else {
          currentStay = [location];
        }
      } else {
        currentStay.push(location);
      }
      lastLocation = location;
    });

    if (currentStay.length > 1) {
      stays.push(currentStay);
    }

    return stays;
  };

  const getActivityList = async (sap_id: string, formattedDate: string) => {
    CallApi.fetchActivityForMap(sap_id, formattedDate).then(
      (result: any) => {
        if (result.success) {
          if (result) {
            const dl = result.result.filter(
              (f: any) => f.delivery_status === "Done"
            );
            if (dl) {
              const dl_coords: any = Object.values(dl).map((item: any) => ({
                dateTime: item.delivery_date_time,
                lat: item.delivery_latitude,
                lng: item.delivery_longitude,
                partner: item.partner,
              }));
              setDeliveryData(
                dl_coords?.sort(
                  (a: any, b: any) =>
                    Number(new Date(a.dateTime)) - Number(new Date(b.dateTime))
                )
              );
            }
            const cl = result.result.filter(
              (f: any) => f.cash_collection_status === "Done"
            );
            if (cl) {
              const cl_coords: any = Object.values(cl).map((item: any) => ({
                dateTime: item.cash_collection_date_time,
                lat: item.cash_collection_latitude,
                lng: item.cash_collection_longitude,
                partner: item.partner,
                cash_collection: item.cash_collection,
                due_amount: item.due_amount,
              }));
              setCashCollectionData(
                cl_coords.sort(
                  (a: any, b: any) =>
                    Number(new Date(a.dateTime)) - Number(new Date(b.dateTime))
                )
              );
            }
          }

          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error: any) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  const fetchData = async (sap_id: string) => {
    let formattedDate = searchParams.has("start")
      ? searchParams.get("start")
      : formateDateDB(new Date());
    await getActivityList(sap_id, formattedDate as string);
    try {
      setLoading(true);
      setNoData(false);
      // Fetch data based on sap_id
      const snapshot = await get(
        ref(database, `coordinates/${formattedDate}/${sap_id}`)
      );
      const data = snapshot.val();
      if (data) {
        // Extract coordinates from the fetched data
        const coords: any[] = Object.values(data).map((item: any) => ({
          dateTime: item.dateTime,
          lat: item.location.latitude,
          lng: item.location.longitude,
        }));

        // Sort coordinates by dateTime in ascending order
        coords.sort(
          (a: any, b: any) =>
            Number(new Date(a.dateTime)) - Number(new Date(b.dateTime))
        );
        // Update state with the extracted coordinates
        const stays = identifyStays(coords);
        setCoordinates(coords);
        setStays(stays);
        const avgLat: number =
          coords.reduce((acc: any, cur: any) => acc + cur.lat, 0) /
          coords.length;
        const avgLng: number =
          coords.reduce((acc: any, cur: any) => acc + cur.lng, 0) /
          coords.length;
        setMapCenter({ lat: coords[0].lat, lng: coords[0].lng });

        // Set the streetCoordinates based on fetched data
        setStreetCoordinates(coords.map(({ lat, lng }) => ({ lat, lng })));

        setLoading(false);
      } else {
        toast.warning("No user data found");
        setLoading(false);
        setNoData(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data from Firebase:", error);
    }
  };

  useEffect(() => {
    if (searchParams.has("q")) {
      fetchData(searchParams.get("q") || "");
    }
  }, [searchParams]);

  const displayStays = (stays: any[]) => {
    return stays.map((stay, index) => {
      const startTime = new Date(stay[0].dateTime);
      const endTime = new Date(stay[stay.length - 1].dateTime);
      const duration = Math.round(
        (Number(endTime) - Number(startTime)) / 1000 / 60
      ); // Duration in minutes

      const avgLat =
        stay.reduce((acc: any, cur: any) => acc + cur.lat, 0) / stay.length;
      const avgLng =
        stay.reduce((acc: any, cur: any) => acc + cur.lng, 0) / stay.length;

      const circleOptions = {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 200, // Set radius to 200 meters
        zIndex: 1,
      };

      return (
        <>
          <Marker
            key={`marker-${index}`}
            position={{ lat: avgLat, lng: avgLng }}
            label={{
              text: `${index + 1}`, // Sequential number as label
              color: "white", // Text color
              fontSize: "14px", // Text size
              fontWeight: "bold", // Text weight
            }}
            onClick={() =>
              setSelectedStay({
                lat: avgLat,
                lng: avgLng,
                duration,
                startTime: stay[0].dateTime,
              })
            }
          />
          {/*<Circle */}
          {/*  key={`circle-${index}`}*/}
          {/*  center={{ lat: avgLat, lng: avgLng }}*/}
          {/*  options={circleOptions}*/}
          {/*/>*/}
        </>
      );
    });
  };

  if (loading)
    return (
      <p className="text-primary">
        <Spinner />
      </p>
    );

  if (noData)
    return (
      <section className="py-10">
        <NoData />
      </section>
    );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "80vh" }}
      center={mapCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {coordinates.length > 0 && (
        <>
          {/* Polyline to mark the street/path based on fetched data */}
          {streetCoordinates.length > 0 && (
            <Polyline
              path={streetCoordinates}
              options={{
                strokeColor: "#0000FF", // Color of the street line
                strokeOpacity: 0.8,
                strokeWeight: 4, // Line thickness
              }}
            />
          )}

          {displayStays(stays)}
          {selectedStay && (
            <InfoWindow
              position={{ lat: selectedStay.lat, lng: selectedStay.lng }}
              onCloseClick={() => setSelectedStay(null)}
            >
              <div>
                <h3>Stay Duration</h3>
                <p>Start: {moment(selectedStay.startTime).format("lll")}</p>
                <p>Duration: {selectedStay.duration} minutes</p>
              </div>
            </InfoWindow>
          )}

          {coordinates.map((coord, index) => {
            if (index === 0 || index === coordinates.length - 1) {
              return (
                <Marker
                  key={index}
                  position={{ lat: coord.lat, lng: coord.lng }}
                  // label={index === 0 ? 'Start' : 'End'}
                  icon={{
                    url: `https://maps.google.com/mapfiles/ms/icons/${
                      index === 0 ? "blue" : "red"
                    }-dot.png`,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                  onClick={() => {
                    setSelectedCoord(coord);
                  }}
                />
              );
            }
            return null;
          })}

          {deliveryData.map((data: any, index) => (
            <Marker
              key={`delivery-${index}`}
              position={{ lat: data.lat, lng: data.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue.png", // Blue icon for delivery
                scaledSize: new window.google.maps.Size(60, 60),
                labelOrigin: new window.google.maps.Point(30, 20),
              }}
              label={{
                text: `${index + 1}`,
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              onClick={() => setSelectedDelivery(data)}
            />
          ))}
          {cashCollectionData.map((data: any, index) => (
            <Marker
              key={`cashCollection-${index}`}
              position={{ lat: data.lat, lng: data.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green.png", // Green icon for cash collection
                scaledSize: new window.google.maps.Size(60, 60),
                labelOrigin: new window.google.maps.Point(30, 20),
              }}
              label={{
                text: `${index + 1}`,
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              onClick={() => setSelectedCashCollection(data)}
            />
          ))}

          {selectedDelivery && (
            <InfoWindow
              position={{
                lat: selectedDelivery.lat,
                lng: selectedDelivery.lng,
              }}
              onCloseClick={() => setSelectedDelivery(null)} // Clear selection on close
            >
              <div>
                <h5>Delivery Details</h5>
                <p>
                  Date Time: {moment(selectedDelivery.dateTime).format("lll")}
                </p>
                <div>Partner: {selectedDelivery.partner}</div>
              </div>
            </InfoWindow>
          )}

          {/* InfoWindow for selected Cash Collection Marker */}
          {selectedCashCollection && (
            <InfoWindow
              position={{
                lat: selectedCashCollection.lat,
                lng: selectedCashCollection.lng,
              }}
              onCloseClick={() => setSelectedCashCollection(null)} // Clear selection on close
            >
              <div>
                <h5>Cash Collection Details</h5>
                <p>
                  Date Time:{" "}
                  {moment(selectedCashCollection.dateTime).format("lll")}
                </p>
                <div>Partner: {selectedCashCollection.partner}</div>
                <div>
                  Cash Collection: {selectedCashCollection.cash_collection}
                </div>
                <div>Due Amount: {selectedCashCollection.due_amount}</div>
              </div>
            </InfoWindow>
          )}
        </>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default TrackingMapSection;

