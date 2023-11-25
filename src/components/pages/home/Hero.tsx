import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="w-full lg:h-[24rem] h-44 bg-slate-100 dfgdf rounded-lg flex items-center justify-between px-4 md:px-20 z-20">
          <div className="text-left">
            <p className="md:text-lg text-xs font-medium text-slate-700 mb-2 ml-0.5 md:ml-1">
              Elevate your style with our handcrafted bangles
            </p>
            <h1 className="md:text-5xl text-xl font-bold md:mb-5 mb-2">
              Discover Exquisite Bangles Collection
            </h1>
            <Link
              href={"/shop"}
              className={cn(buttonVariants({ size: "sm" }), "md:hidden ")}
            >
              Shop Now
            </Link>
            <Link
              href={"/shop"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden md:flex w-fit md:ml-1 text-lg items-center"
              )}
            >
              Shop Now
            </Link>
          </div>
          <div className="relative w-[15rem] md:w-[25rem] h-full z-10 overflow-hidden hidden md:block">
            <Image
              src="/pages/home/hero-img.png"
              alt="hero"
              className="object-contain drop-shadow-lg z-0 mt-4 md:mt-5 "
              fill
              priority
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
