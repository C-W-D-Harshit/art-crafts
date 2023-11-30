import React from "react";
import MenuItems from "./MenuItems";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { Button } from "../ui/button";
import { Heart, Search, ShoppingBag, User2 } from "lucide-react";
import SearchComp from "./SearchComp";
import MenuBtns from "./MenuBtns";

// shadow-[0_3px_10px_rgb(0,0,0,0.2)]

export default function Navbar() {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 ">
      <header className="relative bg-white border-b border-slate-200 px-4">
        <MaxWidthWrapper>
          <div className="">
            <div className="flex h-16 items-center justify-center lg:justify-between">
              <div className="flex items-center gap-x-20">
                <Link href="/" className=" font-bold text-3xl logo__">
                  Arts & Crafts
                </Link>
                <MenuItems />
              </div>
              <div className="hidden lg:flex items-center gap-x-10">
                <SearchComp />
                <MenuBtns />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
