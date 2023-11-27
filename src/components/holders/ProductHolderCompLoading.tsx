import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, MoveRightIcon } from "lucide-react";
import ProductCard from "../cards/ProductCard";
import { getProducts } from "@/actions/productActions";
import ProductCardLoading from "../cards/ProductCardLoading";

export default async function ProductHolderCompLoading() {
  return (
    <div className="w-full flex items-center gap-3 md:gap-4 flex-nowrap overflow-x-scroll no-scrollbar">
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
    </div>
  );
}
