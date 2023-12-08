import { getProductThroughSlug } from "@/actions/productActions";
import SimilarProductHolder from "@/components/holders/SimilarProductHolder";
import AddToCart from "@/components/pages/shop/AddToCart";
import AddToWishlist from "@/components/pages/shop/AddToWishlist";
import Client from "@/components/pages/shop/Client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategoryNameByLabel } from "@/data/category";
import { bangleSizes } from "@/data/sizes";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  CreditCardIcon,
  HeartIcon,
  RecycleIcon,
  ShirtIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let product: any = null;

  if (product === null) {
    const data = await getProductThroughSlug(slug);
    // console.log("data fetched");
    product = data.product;
  }

  return (
    <div className="w-full min-h-[100dvh-4rem]">
      <section className="h-full md:h-[94dvh] w-full flex flex-col md:flex-row mb-6 md:mb-12">
        <Client
          produc={JSON.stringify(product)}
          searchParams={searchParams}
          slug={slug}
        />
      </section>
      <section className="my-6">
        <SimilarProductHolder
          feature="Similar Products"
          link={`/categories/${product.category}`}
          searchParams={{ category: product.category }}
          title="Similar Products"
        />
      </section>
    </div>
  );
}
