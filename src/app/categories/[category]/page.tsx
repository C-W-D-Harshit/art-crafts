import { getProducts } from "@/actions/productActions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/cards/ProductCard";
import SortBy from "@/components/pages/shop/SortBy";
import React from "react";

export default async function Page({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getProducts({ category });
  return (
    <div className="w-full p-5 min-h-screen">
      <MaxWidthWrapper>
        <div className="w-full">
          <SortBy searchParams={searchParams} />
          <div className="w-full flex gap-6 items-center justify-center flex-wrap">
            {data?.products?.map((product: any, index: number) => {
              return <ProductCard product={product} key={product._id} />;
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
