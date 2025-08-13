"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";

type Data = {
  value: string;
  label: string;
};

export function Combobox({
  data,
  onValueChange,
  onSelect,
  className,
  paramName,
  ...props
}: React.ComponentProps<"input"> & {
  data: Data[];
  onValueChange?: (search: string) => void;
  onSelect?: (value: string) => void;
  paramName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-[200px] overflow-hidden justify-between",
              className
            )}
          >
            <span className="w-[190px] text-left overflow-hidden">
              {value
                ? data.find((item) => item.value === value)?.label
                : props.placeholder ?? "Select"}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search data..."
              onValueChange={(item) => {
                if (onValueChange) {
                  onValueChange(item);
                }

                if (paramName) {
                  setSearch(item);
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {data
                  .filter(
                    (item) =>
                      typeof item.label === "string" &&
                      item.label.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        onSelect?.(currentValue === value ? "" : currentValue);

                        if (paramName) {
                          setSearch("");
                          const params = new URLSearchParams(searchParams);

                          if (currentValue === value) {
                            params.delete(paramName);
                          } else {
                            params.set(paramName, currentValue);
                          }
                          router.push(`${pathname}?${params.toString()}`);
                        }
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <input className="hidden" {...props} />
    </>
  );
}
