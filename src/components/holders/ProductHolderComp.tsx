import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, MoveRightIcon } from "lucide-react";
import ProductCard from "../cards/ProductCard";
import { getProducts } from "@/actions/productActions";

export default async function ProductHolder({
  searchParams,
}: {
  searchParams: any;
}) {
  const data = await getProducts(searchParams);
  return (
    <div className="w-full flex items-center gap-3 md:gap-4 flex-nowrap overflow-x-scroll no-scrollbar">
      {data?.products?.map((product: any) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
}
