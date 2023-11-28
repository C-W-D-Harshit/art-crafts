import { getProductThroughSlug } from "@/actions/productActions";
import { cn } from "@/lib/utils";
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
  const { product } = await getProductThroughSlug(slug);
  const activeImageNumber = searchParams.activeImage
    ? Number(searchParams.activeImage)
    : 0;
  return (
    <div className="w-full min-h-[100dvh-4rem]">
      <section className="h-[94dvh] w-full flex">
        <div className="w-1/2 bg-slate-50 h-full flex">
          <div className="w-2/6 bg-slate-50 h-full p-5 flex flex-col items-center justify-center gap-4">
            {product.images.map((image: any, index: number) => {
              return (
                <Link
                  key={image._id}
                  className={cn("bg-slate-100 h-16 w-16 relative rounded-md", {
                    "border-2 border-slate-500 p-5":
                      index === activeImageNumber,
                  })}
                  href={{
                    pathname: `/shop/${slug}`,
                    query: { activeImage: index },
                  }}
                >
                  <Image src={image.url} alt="img" fill />
                </Link>
              );
            })}
          </div>
          <div className="w-full bg-slate-50 h-full relative p-12">
            <Image
              src={product.images[activeImageNumber]?.url}
              alt={product.name}
              fill
              className="object-contain p-16"
            />
          </div>
        </div>
        <div className="w-1/2 h-full">f</div>
      </section>
    </div>
  );
}
