"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table";
import { useSearchParams } from "next/navigation";
import { MessageSquareOff, Search, ServerOff, Waypoints } from "lucide-react";
import { Button } from "../ui/button";
import { formatDateTimeTZ, formatDateTZ, formatNumber } from "@/lib/formatters";
import StatusTag from "./StatusTag";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import DetailsView from "./DetailsView";

export default function ConveyanceTable({
  data,
  connectionError,
}: {
  data: any[];
  connectionError: boolean;
}) {
  const [view, setView] = useState<any>(false);
  const searchParams = useSearchParams();

  return (
    <>
      <Table className="[&_th]:text-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead className="text-nowrap">#</TableHead>
            <TableHead>Journey Start</TableHead>
            <TableHead>Journey End</TableHead>
            <TableHead>Journey From</TableHead>
            <TableHead>Journey To</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!searchParams.has("q") ? (
            <>
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  className="py-20 text-gray-400 pointer-events-none"
                >
                  <Search className="size-10" />
                  <span className="text-[11px]">Search by DA Code</span>
                </TableCell>
              </TableRow>
            </>
          ) : connectionError ? (
            <TableRow className="table-row-nowrap">
              <TableCell
                colSpan={8}
                align="center"
                className="py-20 text-gray-400 pointer-events-none"
              >
                <ServerOff className="size-10" />
                <span className="text-[11px]">Database Discounted</span>
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-nowrap"># {index + 1}</TableCell>
                <TableCell>
                  {formatDateTimeTZ(item.start_journey_date_time)}
                </TableCell>
                <TableCell>
                  {formatDateTimeTZ(item.end_journey_date_time as Date)}
                </TableCell>
                <TableCell>
                  {item.start_journey_latitude && (
                    <ReverseGeocodeCell
                      lat={item.start_journey_latitude}
                      long={item.start_journey_longitude}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {item.end_journey_latitude && (
                    <ReverseGeocodeCell
                      lat={item.end_journey_latitude}
                      long={item.end_journey_longitude}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {item.start_journey_latitude && item.end_journey_latitude && (
                    <DistanceCell
                      origin={`${item.start_journey_latitude},${item.start_journey_longitude}`}
                      destination={`${item.end_journey_latitude},${item.end_journey_longitude}`}
                    />
                  )}
                </TableCell>
                <TableCell>{formatNumber(item.transport_cost)}</TableCell>
                <TableCell>
                  <StatusTag name={item.journey_status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant={"link"}
                    className="rounded-full"
                    onClick={() => setView(item)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  className="py-20 text-gray-400 pointer-events-none"
                >
                  <MessageSquareOff className="size-10" />
                  <span className="text-[11px]">No data</span>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>

      {/* delivery details modal */}
      <Dialog open={view} onOpenChange={setView}>
        <DialogContent className="md:min-w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Waypoints className="size-4 text-primary" />
              <span>Conveyance Details</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          <DetailsView details={view} />
        </DialogContent>
      </Dialog>
    </>
  );
}

const DistanceCell = ({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) => {
  const [distance, setDistance] = useState("Loading...");

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const url =  `/api/distance?origins=${origin}&destinations=${destination}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          setDistance(data.rows[0].elements[0].distance.text);
        } else {
          setDistance("Error");
        }
      } catch (error) {
        setDistance("Failed to load");
      }
    };

    fetchDistance();
  }, [origin, destination]);

  return <span>{distance}</span>;
};

const ReverseGeocodeCell = ({ lat, long }: { lat: number; long: number }) => {
  const [location, setLocation] = useState("Loading...");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "OK") {
          setLocation(data.results[0].formatted_address);
        } else {
          setLocation("Not Found");
        }
      } catch (error) {
        setLocation("Error Loading");
      }
    };

    fetchLocation();
  }, [lat, long]);

  return <span>{location}</span>;
};
