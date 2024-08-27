"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Tooltips from "@/components/ui/Tooltips";
import { formatDate } from "@/lib/formatters";
import { rdl_user_list } from "@prisma/client";
import { Edit, Globe, MessageSquareOff, Trash, UserPen } from "lucide-react";
import React, { useState } from "react";
import UserForm from "./UserForm";

function UserTable({
  data,
  connectionError,
}: {
  data: rdl_user_list[];
  connectionError: boolean;
}) {
  const [editUser, setEditUser] = useState<any>(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SAP ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {connectionError ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                className="py-20 text-gray-400 pointer-events-none"
              >
                <Globe className="size-10" />
                <span className="text-[11px]">Check Internet Connection</span>
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.sap_id}>
                <TableCell>{item.sap_id}</TableCell>
                <TableCell>{item.full_name}</TableCell>
                <TableCell>{item.mobile_number}</TableCell>
                <TableCell>{item.user_type}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Tooltips title="Edit">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full size-8"
                      onClick={() => setEditUser(item)}
                    >
                      <Edit className="size-4" />
                    </Button>
                  </Tooltips>
                  <Tooltips title="Delete">
                    <Button
                      size={"icon"}
                      variant={"destructive"}
                      className="rounded-full size-8"
                      //   onClick={() => setDelDoctor(item.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </Tooltips>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  className="py-20 text-gray-400 pointer-events-none"
                >
                  <MessageSquareOff className="size-10" />
                  <span className="text-[11px]">No data</span>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>

      {/* edit user dialog */}
      <Dialog open={editUser} onOpenChange={setEditUser}>
        <DialogContent className="md:w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPen className="size-4 text-primary" />
              <span>Edit User</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          <UserForm user={editUser} onClose={() => setEditUser(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserTable;
