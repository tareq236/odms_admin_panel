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
import {
  Edit,
  MessageSquareOff,
  ServerOff,
  Trash,
  UserPen,
} from "lucide-react";
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
import RouteForm from "./RouteForm";
import { deleteRoute } from "@/app/actions/routes";
import { rdl_route_wise_depot } from "@/prisma/generated/client1";
import { AuthUser } from "@/types/AuthUser";

export default function RouteTable({
  data,
  connectionError,
  user,
}: {
  data: rdl_route_wise_depot[];
  connectionError: boolean;
  user: AuthUser;
}) {
  const [editRoute, setEditRoute] = useState<any>();
  const [delRoute, setDelRoute] = useState<any>();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Depot code</TableHead>
            <TableHead>Depot name</TableHead>
            {user.role?.includes("admin") && (
              <TableHead className="text-right">Actions</TableHead>
            )}
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
              <TableRow key={item.route_code}>
                <TableCell>{item.route_code}</TableCell>
                <TableCell>{item.route_name}</TableCell>
                <TableCell>{item.depot_code}</TableCell>
                <TableCell>{item.depot_name}</TableCell>

                {user.role?.includes("admin") && (
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
                        onClick={() => setDelRoute(item.id)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </Tooltips>
                  </TableCell>
                )}
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
          <RouteForm route={editRoute} onClose={() => setEditRoute(false)} />
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
                startTransition(async () => {
                  await deleteRoute(delRoute);
                  toast.success("Route is deleted");
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
