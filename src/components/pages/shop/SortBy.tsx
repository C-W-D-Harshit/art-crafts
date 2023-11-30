"use client";

import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SortBy({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(searchParams.sortBy ?? "");
  const gstRates = [
    { category: "Low to High", rate: "lth" },
    { category: "High to Low", rate: "htl" },
  ];
  return (
    <div className="w-full flex justify-end">
      <div className="w-56 mb-5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border-slate-300 bg-slate-50"
            >
              {value
                ? gstRates.find((framework) => framework.rate === value)
                    ?.category
                : "Sort By"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandEmpty>Nothing Found</CommandEmpty>
              <CommandGroup>
                {gstRates.map((framework) => (
                  <CommandItem
                    key={framework.rate}
                    value={framework.rate}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      router.push(
                        `/shop?sort=${
                          currentValue === "lth" ? "price" : "-price"
                        }`
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.rate ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
