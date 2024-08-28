"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createRoute } from "@/app/actions/route";
import { toast } from "sonner";

type RouteFormProps = {
    onClose: () => void
}

export default function RouteForm({onClose}: RouteFormProps) {
  const [data, action] = useFormState(createRoute, null);

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
          <Input id="route" name="route" />
          {data?.error && <p className="error-msg">{data.error.route}</p>}
        </p>
        <p>
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" />
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
      {pending ? `Saving...` : `Save`}
    </Button>
  );
};
