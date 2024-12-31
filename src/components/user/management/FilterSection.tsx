"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Search from "@/components/ui/Search";
import { Plus, Upload, UserPen } from "lucide-react";
import React, { useState } from "react";
import UserForm from "./UserForm";
import BulkUploadForm from "./BulkUploadForm";

export default function FilterSection() {
  const [add, setAdd] = useState(false);
  const [upload, setUpload] = useState(false);

  return (
    <>
      <section className="filter-section">
        <Search placeholder="Search by ID, name, mobile" />

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant={"secondary"}
            onClick={() => {
              setUpload(true);
            }}
          >
            <Upload className="size-4 mr-2" />
            <span>Bulk upload</span>
          </Button>

          <Button
            onClick={() => {
              setAdd(true);
            }}
          >
            <Plus className="size-4 mr-2" />
            <span>Add</span>
          </Button>
        </div>
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

      {/* bulk upload dialog */}
      <Dialog open={upload} onOpenChange={setUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="size-4 text-primary" /> Bulk Upload
            </DialogTitle>
          </DialogHeader>

          <div className="my-3">
            <BulkUploadForm onClose={() => setUpload(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
