import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProductCardLoading() {
  return (
    <div className="w-56 min-w-[14rem] md:w-72 md:min-w-[19.15%]  ">
      <div>
        <Skeleton className="w-full h-64 md:h-80 relative rounded-md bg-slate-100 group ease-in-out duration-700 mb-4 z-10"></Skeleton>
      </div>
      <div className="flex h-16 items-center justify-between">
        <Skeleton className="w-[65%] h-full bg-slate-100">
          <p></p>
        </Skeleton>
        <Skeleton
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "h-full w-20"
          )}
        ></Skeleton>
      </div>
    </div>
  );
}
