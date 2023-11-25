import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: any) {
  return (
    <div className="w-56 min-w-[14rem] md:w-72 md:min-w-[19.15%]  ">
      <Link href={`/shop/1`}>
        <div className="w-full h-64 md:h-80 relative rounded-md bg-slate-100 group ease-in-out duration-700 mb-4 z-10">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full bg-white absolute top-0 right-0 mt-3 mr-3 hover:text-red-500 transition-all hover:bg-white ease-in-out duration-700 md:group-hover:flex md:hidden z-20 md:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <HeartIcon />
          </Button>
          <Image
            src={"/dummy/product/bangle.png"}
            alt={"Product"}
            fill
            className="object-contain drop-shadow-md group-hover:scale-105 transition-all ease-in-out duration-700"
          />
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div className="w-[65%]">
          <p className="text-lg font-medium truncate ">
            Classic Gold Bangle for Kids
          </p>
          <p className="text-sm text-slate-500">Kids Wear</p>
        </div>
        <div className={buttonVariants({ variant: "secondary" })}>
          <p>₹88590</p>
        </div>
      </div>
    </div>
  );
}
