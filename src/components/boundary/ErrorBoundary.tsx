"use client";

import { error } from "console";
import React from "react";
import { toast } from "sonner";

const ErrorBoundary = ({
  children,
  error,
}: React.PropsWithChildren & { error: Error | string | undefined }) => {
  React.useEffect(() => {
    if (error) {
      let message = "";
      if (typeof error === "string") {
        message = error;
      } else {
        message = error.message;
      }

      toast.error(message);
    }
  }, [error]);

  return <>{children}</>;
};

export { ErrorBoundary };
