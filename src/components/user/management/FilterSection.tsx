"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Search from "@/components/ui/Search";
import { Plus, UserPen } from "lucide-react";
import React, { useState } from "react";
import UserForm from "./UserForm";

export default function FilterSection() {
  const [add, setAdd] = useState(false);

  return (
    <>
      <section className="filter-section">
        <Search placeholder="Search by ID, name, mobile" />

        <Button
          onClick={() => {
            setAdd(true);
          }}
        >
          <Plus className="size-4 mr-2" />
          <span>Add</span>
        </Button>
      </section>

      {/* add user dialog */}
      <Dialog open={add} onOpenChange={setAdd}>
        <DialogContent className="md:w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPen className="size-4 text-primary" />
              <span>Add User</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          <UserForm onClose={() => setAdd(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
