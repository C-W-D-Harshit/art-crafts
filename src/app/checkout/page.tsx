"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import useCartStore from "@/store/cart";
import useStore from "@/store/store";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Page() {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const cartQuantity: any = useStore(
    useCartStore,
    (state) => state.cartQuantity
  );
  const cartTotalPrice = useStore(
    useCartStore,
    (state) => state.cartTotalPrice
  );

  const { data: session, update } = useSession();
  let ses: any = session;

  //   const { addToCart, removeFromCart, clearCart, decreaseQuantityInCart } = useCartStore();
  return (
    <div className="w-full min-h-screen">
      <MaxWidthWrapper className="my-6">
        <div className="hidden w-full md:flex  font-medium items-center gap-2 capitalize mb-8 text-slate-600">
          <Link href={"/"}>
            <p className="min-w-max">Home</p>
          </Link>
          <ChevronRightIcon />
          <Link href={`/shop`}>
            <p className="min-w-max">Shop</p>
          </Link>
          <ChevronRightIcon />
          <p className="min-w-max">Checkout</p>
        </div>
        <div className="flex h-14 items-center gap-3 mb-6">
          <div className="w-1.5 bg-primary h-full rounded-lg" />
          <p className="font-bold text-2xl md:text-3xl">Check Out</p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-12">
          <div className="w-full h-full p-3 bg-purple-100"></div>
          <div className="md:w-[45%] w-full p-6 py-7 h-full border border-slate-300 rounded-lg ">
            <h3 className="md:text-2xl text-2xl font-semibold">
              Order Summary
            </h3>
            <Separator className="my-6" />
            <div className="mb-6 w-full">
              {cartItems?.map((cartItem, index) => (
                <div key={index} className="w-full mb-3">
                  <div className="w-full flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-24 h-24">
                        <Image
                          src={cartItem.image}
                          alt=""
                          fill
                          className="object-contain p-2 rounded-lg bg-slate-100"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold truncate w-32 md:w-48">
                          {cartItem.name}
                        </p>
                        <p className="text-slate-700 font-medium">
                          <span className="text-base font-semibold text-primary">
                            Size:{" "}
                          </span>
                          {cartItem.size}
                        </p>
                        <p className="text-slate-700 font-medium">
                          <span className="text-base font-semibold text-primary">
                            Quantity:{" "}
                          </span>
                          {cartItem.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-base font-semibold text-slate-600">
                      ₹{cartItem.price}
                    </p>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="font-semibold text-lg">Subtotal</p>
              <p className="font-medium text-base">₹{cartTotalPrice}</p>
            </div>
            <div className="w-full flex items-center justify-between mb-6">
              <p className="font-semibold text-lg">Delivery</p>
              <p className="font-medium text-base">₹40</p>
            </div>
            <Separator className="mb-6" />
            <div className="w-full flex items-center justify-between mb-6">
              <p className="font-semibold text-lg">Total</p>
              <p className="font-medium text-base">
                ₹{(cartTotalPrice as number) + 40}
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
