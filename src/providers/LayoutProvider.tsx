"use client";

import MobBar from "@/components/layout/MobBar";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import useCartStore from "@/store/cart";
import useWishlistStore from "@/store/wishlist";
import Footer from "@/components/layout/Footer";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);
  if (path.startsWith("/admin")) {
    return (
      <>
        <div className="flex-grow flex-1 hidden lg:flex ">{children}</div>
        <div className="lg:hidden h-[100dvh] w-full flex items-center justify-center flex-col gap-5">
          <p className="text-2xl font-bold">Use PC to view this!</p>
          <Link className={cn(buttonVariants())} href={"/"}>
            Go Back
          </Link>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="flex-grow flex-1 ">
        {children}
        <Footer />
      </div>
      <MobBar />
    </>
  );
}
