/* eslint-disable react/no-unescaped-entities */
"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/store/cart";
import useStore from "@/store/store";
import {
  DeleteIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

  const { addToCart, removeFromCart, clearCart, decreaseQuantityInCart } =
    useCartStore();
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
                  Your Bag is empty.
                </h1>
                <p className="md:text-lg text-base font-semibold text-slate-700">
                  You don't have any products in the Bag yet. You will find a
                  lot of intresting products on our Shop page.
                </p>
              </div>
              <Link className={buttonVariants({ size: "lg" })} href={"/shop"}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="w-full py-6">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                Your Bag
              </h1>
              <div className="w-full flex justify-between flex-wrap gap-2">
                <div className="md:w-[65%] w-full">
                  <div className="w-full flex items-center text-center font-bold text-xl mb-3">
                    <div className="w-[33.2%] md:w-[19.8%]"></div>
                    <div className="w-[33.2%] md:w-[19.8%] hidden md:block">
                      Product
                    </div>
                    <div className="w-[33.2%] md:w-[19.8%] hidden md:block">
                      Price
                    </div>
                    <div className="w-[33.2%] md:w-[19.8%]">Quantity</div>
                    <div className="w-[33.2%] md:w-[19.8%]">Total</div>
                  </div>
                  <Separator className="mb-4" />
                  {cartItems?.map((item, index) => {
                    const a = cartItems.length - 1;
                    console.log(a, index);
                    return (
                      <div key={item.productId} className="w-full select-none">
                        <div className="w-full flex items-center mb-3 text-center">
                          <div className="w-[33.2%] md:w-[19.8%] flex items-center justify-center md:h-36 h-28">
                            <Link
                              href={`/shop/${item.slug}`}
                              className=" relative h-full w-28 md:w-36 rounded-lg bg-slate-100"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain drop-shadow-md p-2"
                              />
                              <div className="absolute bottom-1.5 right-1.5 rounded-full p-2 bg-white w-8 h-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex items-center justify-center font-semibold text-sm">
                                {item.size}
                              </div>
                            </Link>
                          </div>
                          <div className="w-[33.2%] md:w-[19.8%] hidden md:block text-center font-semibold text-lg">
                            {item.name}
                          </div>
                          <div className="w-[33.2%] md:w-[19.8%] font-semibold text-lg hidden md:block">
                            ₹ {item.price}
                          </div>
                          <div className="w-[33.2%] md:w-[19.8%] font-semibold text-lg flex items-center justify-center gap-3">
                            <div
                              className="cursor-pointer w-8 h-8 flex justify-center items-center bg-white rounded-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                              onClick={() => {
                                // addToCart({
                                //   image: item.image,
                                //   name: item.name,
                                //   price: item.price,
                                //   productId: item.productId,
                                //   quantity: -1,
                                //   size: item.size,
                                //   slug: item.slug,
                                //   stock: item.stock
                                // });
                                // removeFromCart(item.productId);
                                decreaseQuantityInCart(
                                  item.productId,
                                  item.size
                                );
                              }}
                            >
                              <MinusIcon size={20} />
                            </div>
                            <p>{item.quantity}</p>
                            <div
                              className="cursor-pointer w-8 h-8 flex justify-center items-center bg-white rounded-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                              onClick={() => {
                                addToCart({
                                  image: item.image,
                                  name: item.name,
                                  price: item.price,
                                  productId: item.productId,
                                  quantity: 1,
                                  size: item.size,
                                  slug: item.slug,
                                  stock: item.stock,
                                });
                              }}
                            >
                              <PlusIcon size={20} />
                            </div>
                          </div>
                          <div className="w-[33.2%] md:w-[19.8%] font-semibold text-lg">
                            ₹ {item.totalPrice}
                          </div>
                        </div>
                        {index !== a && <Separator className="mb-3" />}

                        {index === a && (
                          <Button
                            className="gap-3 my-3 text-lg"
                            onClick={() => {
                              clearCart();
                            }}
                          >
                            <TrashIcon />
                            <p>Clear Bag</p>
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="w-full md:w-[28%] h-full p-4 md:p-8 rounded-xl border border-slate-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                  <h3 className="font-bold text-2xl md:text-3xl mb-6">
                    Order Summery
                  </h3>
                  <div className="w-full mb-6">
                    <div className="w-full flex justify-between items-center">
                      <p className="font-semibold text-base">Quantity</p>
                      <p className="font-medium">{cartQuantity}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="font-semibold text-base">Delivery</p>
                      <p className="font-medium">₹40</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="font-semibold text-base">Subtotal</p>
                      <p className="font-medium">₹{cartTotalPrice}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="w-full flex justify-between items-center my-6">
                    <p className="font-bold text-lg">Total</p>
                    <p className="font-semibold text-lg">
                      ₹{(cartTotalPrice as number) + 40}
                    </p>
                  </div>
                  <Button className="w-full text-lg" size={"lg"}>
                    Proceed to checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
