"use client";

import React, { useState } from "react";
import AddToCart from "@/components/pages/shop/AddToCart";
import AddToWishlist from "@/components/pages/shop/AddToWishlist";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategoryNameByLabel } from "@/data/category";
import { bangleSizes } from "@/data/sizes";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  CreditCardIcon,
  HeartIcon,
  RecycleIcon,
  ShirtIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Client({ produc, searchParams, slug }: any) {
  let product = JSON.parse(produc);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(Number(bangleSizes[0]));
  let activeImageNumber = activeImage;
  const filledStars = Math.round(product?.ratings);
  return (
    <>
      <div className="w-full md:w-1/2 bg-slate-50 md:h-full flex h-[40dvh]">
        <div className="w-2/6 bg-slate-50 h-full p-5 flex flex-col items-center justify-center gap-4">
          {product?.images.map((image: any, index: number) => {
            return (
              <div
                key={image._id}
                className={cn(
                  "bg-slate-100 h-16 w-16 relative rounded-md border-slate-500 hover:border-2 transition-all duration-100 ease-in-out select-none",
                  {
                    "border-2 border-slate-500 p-5":
                      index === activeImageNumber,
                  }
                )}
                onClick={() => {
                  setActiveImage(index);
                  console.log("Active image: " + activeImageNumber);
                }}
              >
                <Image
                  src={image.url}
                  alt="img"
                  fill
                  className=" object-contain drop-shadow-2xl"
                />
              </div>
            );
          })}
        </div>
        <div className="w-full bg-slate-50 h-full relative p-12">
          <Image
            src={
              activeImageNumber > product.images.length
                ? product.images.length - 1
                : product.images[activeImageNumber]?.url
            }
            alt={product.name}
            fill
            className="object-contain p-2 md:p-16 drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full p-5 md:px-16 md:py-10">
        <div className="hidden w-full md:flex  font-medium items-center gap-2 capitalize mb-8 text-slate-600">
          <Link href={"/shop"}>
            <p className="min-w-max">Shop</p>
          </Link>
          <ChevronRightIcon />
          <Link href={`/categories/${product.category}`}>
            <p className="min-w-max">
              {getCategoryNameByLabel(product.category)}
            </p>
          </Link>
          <ChevronRightIcon />
          <p className="min-w-max">{product.name}</p>
        </div>
        <p className="text-3xl md:text-4xl font-semibold">{product.name}</p>
        <div className="flex items-center my-3 md:my-8 gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < filledStars ? "text-yellow-300" : "text-gray-300"
                } me-1`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>

          <div className="flex items-center">
            <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
              {product.ratings}
            </p>
            <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
              out of
            </p>
            <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
              {5}
            </p>
          </div>
          <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
            ({product.numOfReviews} Reviews)
          </p>
        </div>
        <div className="my-6 md:my-12">
          <div className="flex items-center text-lg font-semibold mb-4 gap-2">
            <p>Select Size</p>
            <p>&rarr;</p>
          </div>
          <div className="flex items-center gap-4 no-scrollbar w-full overflow-x-auto">
            {bangleSizes.map((size, index) => {
              return (
                <div
                  onClick={() => setActiveSize(Number(size))}
                  key={index}
                  className={cn(
                    "flex items-center justify-center p-2 rounded-md bg-slate-50 border-slate-500 w-12 h-12 font-semibold cursor-pointer",
                    {
                      "border-2 border-slate-500": Number(size) === activeSize,
                    }
                  )}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-6 md:my-12 flex items-center gap-6 w-full flex-wrap">
          <AddToCart data={JSON.stringify(product)} />
          <AddToWishlist data={JSON.stringify(product)} />
          <div className={buttonVariants({ variant: "secondary" })}>
            <p className="text-lg">₹ {product.price}</p>
          </div>
        </div>
        <Separator className="my-6 md:my-12" />
        <div className="my-6 md:my-12">
          <div className="flex h-10 gap-3 items-center mb-4">
            <div className="h-full w-1.5 bg-primary" />
            <h2 className="text-xl font-semibold">Description</h2>
          </div>
          <p className=" font-medium">{product.description}</p>
        </div>
        <Separator className="my-6 md:my-12" />
        <div className="my-6 md:my-12 flex items-center gap-4 md:gap-16 md:gap-y-10 w-full md:w-2/3 md:flex-wrap justify-start overflow-hidden overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 md:gap-3 w-52 md:w-52">
            <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-700">
              <CreditCardIcon />
            </div>
            <p className="text-lg font-medium text-slate-700 min-w-max">
              Secure Payment
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-52 md:w-52">
            <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-700">
              <ShirtIcon />
            </div>
            <p className="text-lg font-medium text-slate-700 min-w-max">
              Size & Fit
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-52 md:w-52">
            <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-700">
              <TruckIcon />
            </div>
            <p className="text-lg font-medium text-slate-700 min-w-max">
              Free Shipping
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-52 md:w-52">
            <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-700">
              <RecycleIcon />
            </div>
            <p className="text-lg font-medium text-slate-700 min-w-max">
              Free Return
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
