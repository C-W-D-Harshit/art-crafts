"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cart";
import useWishlistStore from "@/store/wishlist";
import { ShoppingBagIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function AddToCart({ data }: any) {
  let product = data ? JSON.parse(data) : null;

  const { addToCart, removeFromCart } = useCartStore();
  const { addToWishlist, removeFromWishlist } = useWishlistStore();
  let q = 0;
  return (
    <Button
      className="gap-3 px-5 py-3"
      onClick={() => {
        // updateQuantityOnClick();
        // setC(true);
        q++;
        addToCart({
          productId: product.id,
          quantity: q,
          image: product.images[0].url,
          name: product.name,
          price: product.price,
          stock: product.stock,
          slug: product.slug,
        });
        toast.success("Item added to cart");
      }}
    >
      <ShoppingBagIcon size={22} />
      <p className="text-lg">Add to bag</p>
    </Button>
  );
}
