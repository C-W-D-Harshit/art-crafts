import React, { Suspense } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";
import ProductHolderComp from "./ProductHolderComp";
import ProductHolderCompLoading from "./ProductHolderCompLoading";

export default async function SimilarProductHolder({
  title,
  link,
  feature,
  searchParams,
}: {
  title: string;
  link: string;
  feature: string;
  searchParams: any;
}) {
  return (
    <div className="mb-12">
      <MaxWidthWrapper>
        <div className="w-full">
          <div className="w-full flex justify-between items-center mb-6">
            <div className="h-10 flex gap-3 items-center">
              <div className="w-1.5 bg-primary h-full" />
              <p className="text-xl font-medium">{title}</p>
            </div>
            <Link
              href={link}
              className="text-md flex items-center gap-x-2 hover:text-blue-500 ease-in-out duration-500"
            >
              <p className="text-md flex items-center">Show all</p>
              <MoveRightIcon size={15} />
            </Link>
          </div>
          <Suspense fallback={<ProductHolderCompLoading />}>
            <ProductHolderComp searchParams={searchParams} />
          </Suspense>
          {/* <ProductHolderCompLoading /> */}
          {/* sd */}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
