import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <div className="w-56 min-w-[14rem] md:w-72 md:min-w-[19.15%]  ">
      <Link href={`/shop/1`}>
        <div className="w-full h-64 md:h-80 relative rounded-md bg-slate-100 group ease-in-out duration-700 mb-4 z-10">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full bg-white absolute top-0 right-0 mt-3 mr-3 hover:text-red-500 hover:bg-white ease-in-out duration-700 md:group-hover:flex md:hidden z-20 md:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <HeartIcon />
          </Button>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium">Some Product</p>
          <p className="text-sm text-slate-500">Brand</p>
        </div>
        <div className={buttonVariants({ variant: "secondary" })}>₹500</div>
      </div>
    </div>
  );
}
