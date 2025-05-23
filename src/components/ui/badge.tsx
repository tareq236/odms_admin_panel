import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const CustomBadge = ({ index = 0, children }: { index?: number, children: React.ReactNode }) => {
  return (
    <Badge
      className={`min-w-fit hover:bg-inital ${
        index % 5 === 0
          ? "bg-yellow-400 text-yellow-900"
          : index % 4 === 0
          ? "bg-teal-600"
          : index % 3 === 0
          ? "bg-rose-600 text-rose-50"
          : index % 2 === 0
          ? "bg-fuchsia-200 text-fuchsia-900"
          : ""
      }`}
    >
      {children}
    </Badge>
  );
};

export { Badge, badgeVariants, CustomBadge };
