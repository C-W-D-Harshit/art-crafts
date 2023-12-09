"use client";

import { Heart, ShoppingBag, User2 } from "lucide-react";
import React, { Suspense } from "react";
import { Button } from "../ui/button";
import useCartStore from "@/store/cart";
import { useStore } from "zustand";
import useWishlistStore from "@/store/wishlist";
import Link from "next/link";

export default function MenuBtns() {
  const cartNo = useStore(useCartStore, (state) => state.cartQuantity) ?? 0;
  const wishlistNo =
    useStore(useWishlistStore, (state) => state.wishlistCount) ?? 0;
  return (
    <div className="flex items-center gap-x-4">
      <Link href={"/account/wishlist"}>
        <Button
          variant={"secondary"}
          size={"icon"}
          className=" hover:text-red-500 duration-500 transition-all relative"
        >
          <Heart />
          {wishlistNo > 0 && (
            <span className="flex items-center justify-center w-[1.2rem] h-[1.2rem] text-white absolute top-[-5px] right-[-2px] bg-red-500 rounded-full text-xs">
              <Suspense fallback="0">{wishlistNo}</Suspense>
            </span>
          )}
        </Button>
      </Link>
      <Link href={"/bag"}>
        <Button
          variant={"secondary"}
          size={"icon"}
          className=" hover:text-blue-500 duration-500 transition-all relative"
        >
          <ShoppingBag />
          {cartNo > 0 && (
            <span className="flex items-center justify-center w-[1.2rem] h-[1.2rem] text-white absolute top-[-5px] right-[-2px] bg-blue-500 rounded-full text-xs">
              <Suspense fallback="0">{cartNo}</Suspense>
            </span>
          )}
        </Button>
      </Link>
      <Link href={"/account"}>
        <Button
          variant={"secondary"}
          size={"icon"}
          className=" hover:text-blue-500 duration-500 transition-all"
        >
          <User2 />
        </Button>
      </Link>
    </div>
  );
}
