"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function MenuItems() {
  const path = usePathname();
  const menuItems = [
    {
      lable: "shop",
      link: "/shop",
    },
    {
      lable: "trending",
      link: "/trending",
    },
    {
      lable: "new arrivals",
      link: "/new-arrivals",
    },
  ];
  return (
    <div className="items-center gap-x-1 hidden lg:flex">
      {menuItems.map((item, i) => {
        const isOpen = path === item.link;
        return (
          <Link
            href={item.link}
            key={item.lable}
            className={cn(
              buttonVariants({
                variant: isOpen ? "secondary" : "ghost",
              }),
              " capitalize font-medium text-md text-black",
              {
                "text-blue-500": isOpen,
              }
            )}
          >
            {item.lable}
          </Link>
        );
      })}
    </div>
  );
}
