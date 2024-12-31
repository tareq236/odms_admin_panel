import { bulkUploadUser } from "@/app/admin/user/management/_actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/Spinner";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

type FormProps = {
  onClose: () => void;
};

export default function BulkUploadForm({ onClose }: FormProps) {
  const [data, action] = useFormState(bulkUploadUser, null);

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      onClose();
    }
  }, [data]);

  return (
    <form action={action} className="flex flex-col gap-5">
      <p>
        <Label htmlFor="upload">Upload</Label>
        <Input name="upload" id="upload" className="mt-2" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
      </p>

      <SubmitButton />
    </form>
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
