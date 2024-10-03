"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createRoute, updateRoute } from "@/app/actions/routes";
import { toast } from "sonner";
import { rdl_route_sap } from "@prisma/client";
import Spinner from "../ui/Spinner";

type RouteFormProps = {
    onClose: () => void,
    route?: rdl_route_sap
}

export default function RouteForm({route, onClose}: RouteFormProps) {
  const [data, action] = useFormState(route == null ? createRoute : updateRoute.bind(null, route.route), null);

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
        toast.success(data.success)
        onClose()
    }
  }, [data]);

  return (
    <>
      <form className="flex flex-col gap-5" action={action}>
        <p>
          <Label htmlFor="route">Route</Label>
          <Input id="route" name="route" defaultValue={route?.route || ''} />
          {data?.error && <p className="error-msg">{data.error.route}</p>}
        </p>
        <p>
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" defaultValue={route?.description || ''} />
          {data?.error && <p className="error-msg">{data.error.description}</p>}
        </p>

        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Spinner color="white" className="mr-2 size-4" />}
      {pending ? `Saving...` : `Save`}
    </Button>
  );
};
