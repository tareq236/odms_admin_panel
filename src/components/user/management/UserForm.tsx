"use client";

import { createUser, updateUser } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rdl_users_list } from "@/prisma/generated/client1";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
// import { Select } from "../SelectStatus";
import Spinner from "@/components/ui/Spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface UserFormProps {
  onClose: () => void;
  user?: rdl_users_list;
}

export default function UserForm({ onClose, user }: UserFormProps) {
  const [data, action] = useFormState(
    user == null ? createUser : updateUser.bind(null, user?.sap_id),
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
      <form action={action} className="flex flex-col gap-5">
        <div className="form flex flex-col md:grid gap-x-3 gap-y-5 md:grid-cols-3">
          <p className="">
            <Label htmlFor="sapId">SAP ID</Label>
            <Input
              type="number"
              id="sapId"
              name="sap_id"
              defaultValue={Number(user?.sap_id)}
            />
            {data?.error && <p className="error-msg">{data.error.sap_id}</p>}
          </p>
          <p className="md:col-span-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="full_name"
              defaultValue={user?.full_name || ""}
            />
            {data?.error && <p className="error-msg">{data.error.full_name}</p>}
          </p>
          <p className="md:col-span-2">
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              name="mobile_number"
              defaultValue={user?.mobile_number || ""}
            />
            {data?.error && (
              <p className="error-msg">{data.error.mobile_number}</p>
            )}
          </p>
          <p>
            <Label htmlFor="userType">User Type</Label>
            <Input
              id="userType"
              name="user_type"
              defaultValue={user?.user_type || ""}
            />
          </p>
          <p>
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              name="user_designation"
              defaultValue={user?.user_designation || ""}
            />
          </p>
          <p>
            <Label htmlFor="password">password</Label>
            <Input
              id="password"
              name="password"
              defaultValue={user?.password || ""}
            />
            {data?.error && <p className="error-msg">{data.error.password}</p>}
          </p>
          <p className="flex flex-col gap-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={user?.status?.toString() ?? undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">In Acitve</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {data?.error && <p className="error-msg">{data.error.status}</p>}
          </p>

          <p>
            <Label htmlFor="userDepot">User Depot</Label>
            <Input
              id="userDepot"
              name="user_depot"
              defaultValue={user?.user_depot || ""}
            />
            {data?.error && (
              <p className="error-msg">{data.error.user_depot}</p>
            )}
          </p>
          <p>
            <Label htmlFor="depot_code">Depot Code</Label>
            <Input
              id="depot_code"
              name="depot_code"
              defaultValue={user?.depot_code || ""}
            />
            {data?.error && (
              <p className="error-msg">{data.error.depot_code}</p>
            )}
          </p>
          <p>
            <Label htmlFor="location">Job location</Label>
            <Input
              id="location"
              name="user_job_location"
              defaultValue={user?.user_job_location || ""}
            />
          </p>
        </div>

        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
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
