"use client";

import { Button } from "@/components/ui/button";
import useWishlistStore from "@/store/wishlist";
import { HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { useStore } from "zustand";

export default function AddToWishlist({ data }: any) {
  let product = data ? JSON.parse(data) : null;

  const wishlistItems = useStore(
    useWishlistStore,
    (state) => state.wishlistItems
  );
  const [wish, setWish] = useState(false);
  const { addToWishlist, removeFromWishlist } = useWishlistStore();

  // Function to check if a product is in the wishlist
  const isProductInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.productId === productId);
  };
  return (
    <Button
      className="gap-3 bg-slate-100 px-5 py-3 border-red-500"
      variant={"outline"}
      onClick={() => {
        setWish(!wish);
        if (isProductInWishlist(product._id)) {
          removeFromWishlist(product._id);
        } else {
          addToWishlist({
            productId: product._id,
          });
        }
      }}
      //   disabled={isProductInWishlist(data.product.id)}
      color="crimson"
    >
      <HeartIcon size={22} className="text-red-500" />
      <p className="text-lg">
        {isProductInWishlist(product._id)
          ? "Remove from wishlist"
          : "Add to wishlist"}
      </p>
    </Button>
  );
}
