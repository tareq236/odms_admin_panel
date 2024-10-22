"use client";

import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";
import AccordionHeading from "./AccordionHeading";

type AccordionProps = ComponentProps<"div"> & {
  show?: boolean;
  name: string;
};

function Accordion({ className, name, show=false, children, ...props }: AccordionProps) {
  const [active, setActive] = React.useState(show);

  return (
    <div
      {...props}
      className={cn(
        `${
          active ? "max-h-[500px]" : "max-h-[33px] border-b"
        } overflow-hidden transition-all duration-300`,
        className,
      )}
    >
      <AccordionHeading title={name} active={active} setActive={setActive} />

      {children}
    </div>
  );
}

export default Accordion;
