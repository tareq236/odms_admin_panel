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
import { rdl_users_list } from "@/prisma/generated/client1";
import { Edit, MessageSquareOff, ServerOff, Trash, UserPen } from "lucide-react";
import React, { useState, useTransition } from "react";
import UserForm from "./UserForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import { deleteUser } from "@/app/actions/user";
import UserStatusTag from "../UserStatusTag";

function UserTable({
  data,
  connectionError,
}: {
  data: rdl_users_list[];
  connectionError: boolean;
}) {
  const [editUser, setEditUser] = useState<any>(false);
  const [delUser, setDelUser] = useState<any>();

  const [isPending, startTransition] = useTransition();

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
                <ServerOff className="size-10" />
                <span className="text-[11px]">Database Discounted</span>
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.sap_id}>
                <TableCell>{item.sap_id}</TableCell>
                <TableCell>{item.full_name}</TableCell>
                <TableCell>{item.mobile_number}</TableCell>
                <TableCell>{item.user_type}</TableCell>
                <TableCell className="min-w-[120px]"><UserStatusTag status={item.status.toString()} /></TableCell>
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
                        onClick={() => setDelUser(item.sap_id)}
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

      {/* delete user confirmation modal */}
      <AlertDialog open={!!delUser} onOpenChange={setDelUser}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              <b> user</b> and remove data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  try {
                    await deleteUser(delUser);
                    toast.success("User is deleted");
                  } catch (error) {
                    console.log(error)
                    toast.warning("Something went wrong!");
                  }
                 
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default UserTable;
