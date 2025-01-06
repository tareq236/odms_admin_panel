"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createRoute, updateRoute } from "@/app/actions/routes";
import { toast } from "sonner";
import { rdl_route_sap, rdl_route_wise_depot } from "@/prisma/generated/client1";
import Spinner from "../ui/Spinner";

type RouteFormProps = {
  onClose: () => void;
  route?: rdl_route_wise_depot;
};

export default function RouteForm({ route, onClose }: RouteFormProps) {
  const [data, action] = useFormState(
    route == null ? createRoute : updateRoute.bind(null, String(route.id)),
    null
  );

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      onClose();
    }
  }, [data]);

  return (
    <>
      <form className="grid grid-cols-2 gap-5" action={action}>
        <p>
          <Label htmlFor="route">Route</Label>
          <Input id="route" name="route" defaultValue={route?.route_code || ""} />
          {data?.error && <div className="error-msg">{data.error.route}</div>}
        </p>
        <p>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            defaultValue={route?.route_name || ""}
          />
          {data?.error && <div className="error-msg">{data.error.description}</div>}
        </p>

        <p>
          <Label htmlFor="depotCode">Depot coe</Label>
          <Input
            id="depotCode"
            name="depotCode"
            defaultValue={route?.depot_code || ""}
          />
          {data?.error && <div className="error-msg">{data.error.depotCode}</div>}
        </p>

        <p>
          <Label htmlFor="depotName">Depot name</Label>
          <Input
            id="depotName"
            name="depotName"
            defaultValue={route?.depot_name || ""}
          />
          {data?.error && <div className="error-msg">{data.error.depotName}</div>}
        </p>

        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="col-span-2">
      {pending && (
        <Spinner
          borderBottomColor="border-b-background"
          className="mr-2 size-4"
        />
      )}
      {pending ? `Saving...` : `Save`}
    </Button>
  );
};
