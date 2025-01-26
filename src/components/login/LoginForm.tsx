"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { adminLogin } from "@/app/actions/auth";
import Spinner from "../ui/Spinner";
import { useRouter } from "next-nprogress-bar";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, action] = useFormState(adminLogin, null);
  const router = useRouter();

  useEffect(() => {
    if (data?.db != null) {
      toast.error(data.db);
    } else if (data?.success) {
      router.replace("/admin");
    }
  });

  return (
    <main className="flex justify-center items-center min-h-[40rem] h-full">
      <div className="max-w-2xl min-w-[20rem] p-5 w-full">
        <header>
          <h2 className="text-primary text-3xl text-center">Sign in</h2>
          <h4 className="text-sm text-center text-muted-foreground my-3">
            Welcome back! Please enter your details
          </h4>
        </header>

        {/* form */}
        <form action={action} className="flex flex-col gap-5 my-8 w-full">
          <p>
            <Label className="text-primary" htmlFor="username">
              Username
            </Label>
            <Input type="text" name="username" id="username" />
            {data?.error?.username && (
              <p className="error-msg">{data.error.username}</p>
            )}
          </p>

          <p className="relative">
            <Label className="text-primary" htmlFor="password">
              Password
            </Label>
            <Input
              type={!showPassword ? "password" : "text"}
              name="password"
              id="password"
            />
            <span
              className="eye absolute top-9 right-3 cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </span>
            {data?.error?.password && (
              <p className="error-msg">{data.error.password}</p>
            )}
          </p>

          <SubmitButton />
        </form>
      </div>
    </main>
  );
};

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
      {pending ? `Login...` : `Login`}
    </Button>
  );
};

export default LoginForm;
