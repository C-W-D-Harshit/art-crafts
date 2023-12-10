/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import useStore from "@/store/store";
import useWishlistStore from "@/store/wishlist";
import { HeartIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import useCartStore from "@/store/cart";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Page() {
  const wishlistItems = useStore(
    useWishlistStore,
    (state) => state.wishlistItems
  );
  const { addToWishlist, removeFromWishlist } = useWishlistStore();
  // console.log("Wishlist", " ", wishlistItems);
  // let product = data ? JSON.parse(data) : null;

  const { addToCart, removeFromCart } = useCartStore();
  let q = 0;
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
          <h1 className="md:text-3xl text-2xl font-bold mb-6">Wishlist</h1>
          <div className="w-full">
            {wishlistItems?.map((item, index) => {
              const a = wishlistItems.length - 1;
              return (
                <div className="w-full" key={item.productId}>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => {
                          removeFromWishlist(item.productId);
                          toast.success(`Removed ${item.name} from wishlist!`);
                        }}
                      >
                        <XIcon />
                      </Button>
                      <div className="relative w-36 h-36 bg-slate-100 rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2 drop-shadow-lg"
                        />
                      </div>
                      <div>
                        <p className="md:text-2xl text-xl font-bold mb-1">
                          {item.name}
                        </p>
                        <p className="text-slate-700 text-base font-semibold">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button
                        className="gap-3 px-5 py-3"
                        onClick={() => {
                          q++;
                          addToCart({
                            productId: item.productId,
                            quantity: 1,
                            image: item.image,
                            name: item.name,
                            price: item.price,
                            stock: item.stock,
                            slug: item.slug,
                          });
                          toast.success("Item added to cart");
                        }}
                      >
                        <ShoppingBagIcon size={22} />
                        <p className="text-lg">Add to bag</p>
                      </Button>
                    </div>
                  </div>
                  {index !== a && <Separator />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
