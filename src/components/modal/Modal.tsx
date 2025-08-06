import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { DialogProps } from "@radix-ui/react-dialog";
import { type LucideIcon } from "lucide-react";

const Modal = ({
  children,
  header,
  open,
  onOpenChange,
}: DialogProps & { children: React.ReactNode } & {
  header: { icon: LucideIcon; title: string };
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:w-[90vw] md:max-w-5xl w-full p-0">
        <ScrollArea className="max-h-[85vh] p-4">
          <DialogHeader className="mb-6">
            <DialogTitle className="flex items-center gap-2">
              <header.icon className="size-4 text-primary" />
              <span>{header.title}</span>
            </DialogTitle>
          </DialogHeader>
        </ScrollArea>

        {/* content */}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
