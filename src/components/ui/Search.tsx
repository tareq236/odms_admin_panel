"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Search({ placeholder = "Search..." }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || "");
  const debounceValue = useDebounce(search);

  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (search) {
      params.set("q", debounceValue);
      params.delete("p");
    } else {
      params.delete("q");
      params.delete("p");
    }
    router.push(pathname + "?" + params.toString());
  }, [debounceValue]);

  return (
    <div className="relative">
      <Input
        type="search"
        name="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8 min-w-[5rem]"
        placeholder={placeholder}
      />
      <Label
        htmlFor="search"
        className="absolute top-[50%] -translate-y-[50%] left-3 text-gray-400"
      >
        <SearchIcon className="size-4" />
      </Label>
    </div>
  );
}

export default Search;
