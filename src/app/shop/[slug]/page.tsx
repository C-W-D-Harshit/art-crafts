import { getProductThroughSlug, getProducts } from "@/actions/productActions";
import SimilarProductHolder from "@/components/holders/SimilarProductHolder";

import Client from "@/components/pages/shop/Client";
import { notFound } from "next/navigation";

import React from "react";

export async function generateStaticParams() {
  const data = await getProducts({ status: "publish" });

  return data.products.map((post: any) => ({
    slug: post.slug,
  }));
}

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

  if (!product) {
    return notFound();
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
