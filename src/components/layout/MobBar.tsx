"use client";

import { cn } from "@/lib/utils";
import {
  HeartIcon,
  HomeIcon,
  ShoppingBagIcon,
  StoreIcon,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobBar() {
  const path = usePathname();
  return (
    <div className="md:hidden flex justify-center bg-white items-center h-16 sticky bottom-0 w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-tl-3xl rounded-tr-3xl px-5 py-4 gap-x-8 z-50">
      <Link
        href={"/shop"}
        className={cn("flex flex-col items-center ", {
          "text-blue-500": path === "/shop",
        })}
      >
        <StoreIcon fontWeight={"400"} />
        <p className="font-semibold text-sm">Shop</p>
      </Link>
      <Link
        href={"/wishlist"}
        className={cn("flex flex-col items-center  relative", {
          "text-blue-500": path === "/wishlist",
        })}
      >
        <HeartIcon fontWeight={"400"} />
        <p className="font-semibold text-sm">Wishlist</p>
        <span className="flex items-center justify-center w-[1.2rem] h-[1.2rem] text-white absolute top-[-5px] right-1 bg-red-500 rounded-full text-xs">
          6
        </span>
      </Link>
      <Link
        href={"/"}
        className={cn("flex flex-col items-center ", {
          "text-blue-500": path === "/",
        })}
      >
        <HomeIcon fontWeight={"400"} />
        <p className="font-semibold text-sm">Home</p>
      </Link>
      <Link
        href={"/bag"}
        className={cn("flex flex-col items-center  relative", {
          "text-blue-500": path === "/bag",
        })}
      >
        <ShoppingBagIcon fontWeight={"400"} />
        <p className="font-semibold text-sm">Bag</p>
        <span className="flex items-center justify-center w-[1.2rem] h-[1.2rem] text-white absolute top-[-5px] right-[-8px] bg-red-500 rounded-full text-xs">
          2
        </span>
      </Link>

      <Link
        href={"/account"}
        className={cn("flex flex-col items-center ", {
          "text-blue-500": path === "/account",
        })}
      >
        <User2 fontWeight={"400"} />
        <p className="font-semibold text-sm">Account</p>
      </Link>
    </div>
  );
}
