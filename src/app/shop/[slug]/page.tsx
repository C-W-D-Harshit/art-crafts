import { getProductThroughSlug } from "@/actions/productActions";
import { Button, buttonVariants } from "@/components/ui/button";
import { getCategoryNameByLabel } from "@/data/category";
import { bangleSizes } from "@/data/sizes";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, ShoppingBagIcon } from "lucide-react";
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
    console.log("data fetched");
    product = data.product;
  }

  let activeImageNumber = searchParams.activeImage
    ? Number(searchParams.activeImage)
    : 0;
  let activeSize = searchParams.size
    ? Number(searchParams.size)
    : bangleSizes[0];
  const filledStars = Math.round(product.ratings);

  return (
    <div className="w-full min-h-[100dvh-4rem]">
      <section className="h-full md:h-[94dvh] w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-slate-50 md:h-full flex h-[40dvh]">
          <div className="w-2/6 bg-slate-50 h-full p-5 flex flex-col items-center justify-center gap-4">
            {product.images.map((image: any, index: number) => {
              return (
                <Link
                  key={image._id}
                  className={cn(
                    "bg-slate-100 h-16 w-16 relative rounded-md border-slate-500 hover:border-2 transition-all duration-100 ease-in-out",
                    {
                      "border-2 border-slate-500 p-5":
                        index === activeImageNumber,
                    }
                  )}
                  href={{
                    pathname: `/shop/${slug}`,
                    query: { activeImage: index, size: activeSize },
                  }}
                >
                  <Image src={image.url} alt="img" fill />
                </Link>
              );
            })}
          </div>
          <div className="w-full bg-slate-50 h-full relative p-12">
            <Image
              src={
                activeImageNumber > product.images.length
                  ? product.images.length - 1
                  : product.images[activeImageNumber]?.url
              }
              alt={product.name}
              fill
              className="object-contain p-2 md:p-16"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full p-5 md:px-16 md:py-10">
          <div className="hidden w-full md:flex text-lg font-medium items-center gap-2 capitalize mb-8 text-slate-600">
            <Link href={"/shop"}>
              <p>Shop</p>
            </Link>
            <ChevronRightIcon />
            <Link href={`/categories/${product.category}`}>
              <p>{getCategoryNameByLabel(product.category)}</p>
            </Link>
            <ChevronRightIcon />
            <p>{product.name}</p>
          </div>
          <p className="text-3xl md:text-4xl font-semibold">{product.name}</p>
          <div className="flex items-center my-3 md:my-8 gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < filledStars ? "text-yellow-300" : "text-gray-300"
                  } me-1`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>

            <div className="flex items-center">
              <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
                {product.ratings}
              </p>
              <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
                out of
              </p>
              <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
                {5}
              </p>
            </div>
            <p className="ms-1 text-lg font-medium text-gray-500 dark:text-gray-400">
              ({product.numOfReviews} Reviews)
            </p>
          </div>
          <div className="my-6 md:my-12">
            <div className="flex items-center text-lg font-semibold mb-4 gap-2">
              <p>Select Size</p>
              <p>&rarr;</p>
            </div>
            <div className="flex items-center gap-4 no-scrollbar w-full overflow-x-auto">
              {bangleSizes.map((size, index) => {
                return (
                  <Link
                    href={{
                      pathname: `/shop/${slug}`,
                      query: { size, activeImage: activeImageNumber },
                    }}
                    key={index}
                    className={cn(
                      "flex items-center justify-center p-2 rounded-md bg-slate-50 border-slate-500 w-12 h-12 font-semibold",
                      {
                        "border-2 border-slate-500":
                          Number(size) === activeSize,
                      }
                    )}
                  >
                    {size}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="my-6 md:my-12 flex items-center gap-6">
            <Button className="gap-3 px-5 py-3">
              <ShoppingBagIcon size={22} />
              <p className="text-lg">Add to bag</p>
            </Button>
            <div className={buttonVariants({ variant: "secondary" })}>
              <p className="text-lg">₹ {product.price}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
