import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, MoveRightIcon } from "lucide-react";
import ProductCard from "../cards/ProductCard";

export default function ProductHolder({
  title,
  link,
  feature,
}: {
  title: string;
  link: string;
  feature: string;
}) {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="w-full">
          <div className="w-full flex justify-between items-center mb-4">
            <p className="text-xl font-medium">{title}</p>
            <Link
              href={link}
              className="text-md flex items-center gap-x-2 hover:text-blue-500 ease-in-out duration-500"
            >
              <p className="text-md flex items-center">Show all</p>
              <MoveRightIcon size={15} />
            </Link>
          </div>
          <div className="w-full flex items-center gap-3 md:gap-4 flex-nowrap overflow-x-scroll no-scrollbar">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
