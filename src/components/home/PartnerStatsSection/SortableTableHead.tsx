"use client";

import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

type SortableTableHeadProps = ComponentProps<"th"> & {
    sortingValue: string
}

export default function SortableTableHeader({
  sortingValue, className, children, ...props
}: SortableTableHeadProps) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const params = new URLSearchParams(searchParams)

  return (
    <TableHead className={cn(`group cursor-pointer transition-all duration-300`, className)} {...props}
        onClick={() => {
            if(params.get('sorting') == sortingValue) {
               params.delete('sorting')
               params.delete('p')
            } else {
                params.set('sorting', sortingValue)
                params.delete('p')
            }
          router.push(pathname + "?" + params.toString(), {scroll: false});

        }}
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        <ArrowUpDown className={`size-4 ${params.get('sorting') === sortingValue ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} />
      </div>
    </TableHead>
  );
}
