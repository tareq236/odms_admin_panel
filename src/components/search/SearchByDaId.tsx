"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon, User2 } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandGroup,
  CommandDialog,
} from "../ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import { rdl_users_list } from "@/prisma/generated/client1";

export default function SearchByDaId({
  placeholder = "Search by DA ID...",
  type = "search",
}: {
  placeholder?: string;
  type?: string;
}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [open, setOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const debounceValue = useDebounce(commandSearch);
  const [user, setUser] = useState<rdl_users_list[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  // keyboard event for open search dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  //   fetch data for search suggestion

  const handleDaSuggestion = async () => {
    const res = await fetch(
      `/api/user${commandSearch ? "?q=" + commandSearch : ""}`
    );
    if (!res.ok) {
      toast.error((await res.json()).message);
      return;
    }
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    handleDaSuggestion();
  }, [debounceValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search) {
      params.set("q", search);
      params.delete("p");
    } else {
      params.delete("q");
      params.delete("p");
    }
    router.push(pathname + "?" + params.toString());
  };

  return (
    <>
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <Button
          variant={"secondary"}
          className="[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground relative w-full justify-start rounded-lg bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
          onClick={() => setOpen(true)}
        >
          <span className="hidden lg:inline-flex">{placeholder}</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.6rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* dialog for search */}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Type a command or search..."
            value={commandSearch}
            onValueChange={(search) => {
              setCommandSearch(search);
            }}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {user.map((item) => (
                <CommandItem key={item.sap_id}>
                  <User2 /> {item.sap_id} - {item.full_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
