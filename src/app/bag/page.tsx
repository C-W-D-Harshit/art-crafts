/* eslint-disable react/no-unescaped-entities */
"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import useCartStore from "@/store/cart";
import useStore from "@/store/store";
import { HeartIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const cartQuantity = useStore(useCartStore, (state) => state.cartQuantity);

  const { addToCart, removeFromCart } = useCartStore();
  return (
    <div className="w-full min-h-screen">
      <MaxWidthWrapper>
        <div className="w-full py-6">
          {cartQuantity === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-10 rounded-md border border-dotted border-slate-500 p-6 md:p-12">
              <div className="rounded-full p-10 bg-blue-100 text-blue-500">
                <ShoppingBagIcon size={50} />
              </div>
              <div className="text-center">
                <h1 className="md:text-4xl text-2xl font-bold mb-1">
                  Your Cart is empty.
                </h1>
                <p className="md:text-lg text-base font-semibold text-slate-700">
                  You don't have any products in the cart yet. You will find a
                  lot of intresting products on our Shop page.
                </p>
              </div>
              <Link className={buttonVariants({ size: "lg" })} href={"/shop"}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="w-full"></div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
