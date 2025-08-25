"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Search from "@/components/ui/Search";
import { Plus, Route } from "lucide-react";
import React, { useState } from "react";
import RouteForm from "./RouteForm";
import { AuthUserProps } from "@/app/admin/route/page";
import { AuthUser } from "@/types/AuthUser";

export default function FilterSection({ user }: { user: AuthUser }) {
  const [add, setAdd] = useState(false);

  return (
    <>
      <section className="filter-section">
        <Search placeholder="Search by route" />

        {user.role === "admin" && (
          <Button
            onClick={() => {
              setAdd(true);
            }}
          >
            <Plus className="size-4 mr-2" />
            <span>Add</span>
          </Button>
        )}
      </section>

      {/* add user dialog */}
      <Dialog open={add} onOpenChange={setAdd}>
        <DialogContent className="md:w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Route className="size-4 text-primary" />
              <span>Add Route</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          <RouteForm onClose={() => setAdd(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
