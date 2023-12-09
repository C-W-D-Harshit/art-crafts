/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import useStore from "@/store/store";
import useWishlistStore from "@/store/wishlist";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default function ClientComp({ wishlistData }: any) {
  let data = JSON.parse(wishlistData ?? "");
  const wishlistItems = useStore(
    useWishlistStore,
    (state) => state.wishlistItems
  );
  const { addToWishlist, removeFromWishlist } = useWishlistStore();
  console.log("Wishlist", " ", wishlistItems);
  console.log(data);
  return (
    <div className="w-full">
      {wishlistItems?.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-10 rounded-md border border-dotted border-slate-500 p-6 md:p-12">
          <div className="rounded-full p-10 bg-pink-100 text-pink-500">
            <HeartIcon size={50} />
          </div>
          <div className="text-center">
            <h1 className="md:text-4xl text-2xl font-bold mb-1">
              Your Wishlist is empty.
            </h1>
            <p className="md:text-lg text-base font-semibold text-slate-700">
              You don't have any products in the wishlist yet. You will find a
              lot of intresting products on our Shop page.
            </p>
          </div>
          <Link className={buttonVariants({ size: "lg" })} href={"/shop"}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <h1>Wishlist</h1>
          <div></div>
        </div>
      )}
    </div>
  );
}
