import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React, { ComponentProps, Dispatch, SetStateAction } from "react";

type AccordionHeadingProps = ComponentProps<"h3"> & {
    title: string,
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

function AccordionHeading({title, className, active, setActive, ...props}: AccordionHeadingProps) {
  return (
    <h3
      className={cn("text-sm font-medium flex items-center gap-3 hover:text-primary cursor-pointer transition-all duration-500", className)}
      onClick={() => setActive(!active)}
    >
        <span className="w-3 aspect-square bg-primary rounded"></span>
      {title}
      <ChevronRight
        className={`size-4 ${
          active ? "rotate-90" : ""
        } transition-all duration-300 ml-5`}
      />
    </h3>
  );
}

export default AccordionHeading;
