'use client'

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
import { Edit, MessageSquareOff, ServerOff, Trash, UserPen } from "lucide-react";
import React, { useState, useTransition } from "react";
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
import { rdl_route_sap } from "@prisma/client";

export default function RouteTable({
    data,
    connectionError,
  }: {
    data: rdl_route_sap[];
    connectionError: boolean;
  }) {

    const [editRoute, setEditRoute] = useState<any>()
    const [delRoute, setDelRoute] = useState<any>()
    const [isPending, startTransition] = useTransition()
    

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Description</TableHead>
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
              <TableRow key={item.route}>
                <TableCell>{item.route}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Tooltips title="Edit">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full size-8"
                      onClick={() => setEditRoute(item)}
                    >
                      <Edit className="size-4" />
                    </Button>
                  </Tooltips>
                  <Tooltips title="Delete">
                    <Button
                      size={"icon"}
                      variant={"destructive"}
                      className="rounded-full size-8"
                      onClick={() => setDelRoute(item.route)}
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

      {/* edit route dialog */}
      <Dialog open={editRoute} onOpenChange={setEditRoute}>
        <DialogContent className="md:w-[90vw] md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPen className="size-4 text-primary" />
              <span>Edit Route</span>
            </DialogTitle>
          </DialogHeader>

          {/* form */}
          {/* <UserForm user={editUser} onClose={() => setEditUser(false)} /> */}
        </DialogContent>
      </Dialog>

      {/* delete route confirmation modal */}
      <AlertDialog open={!!delRoute} onOpenChange={setDelRoute}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              <b> route</b> and remove data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                // startTransition(async () => {
                //   await deleteUser(delUser);
                //   toast.success("User is deleted");
                // });
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
