import {
  deleteProductAction,
  getAdminProducts,
} from "@/actions/productActions";
import DeleteBtn from "@/components/pages/admin/product/DeleteBtn";
import Search from "@/components/pages/admin/product/Search";
import StatusComp from "@/components/pages/admin/product/Status";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategoryNameByLabel } from "@/data/category";
import { cn } from "@/lib/utils";
import { PencilRulerIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getAdminProducts(searchParams);
  return (
    <div className="w-full">
      <div className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-6 rounded-md">
        <div className="flex w-full items-center justify-between mb-4">
          <Search searchParams={searchParams} />
          <Link
            href="/admin/products/create-product"
            className={cn(buttonVariants(), "gap-2")}
          >
            <PlusIcon />
            <p>Add Product</p>
          </Link>
        </div>
        {data?.productsInStore !== 0 ? (
          <div className="w-full  ">
            <div className="w-full px-12 py-3 bg-primary rounded-md text-white flex justify-between items-center mb-2 gap-4">
              <p className="w-[20%] font-semibold text-lg">Product</p>
              <p className="w-[15%] font-semibold text-lg text-center">
                Categories
              </p>
              <p className="w-[15%] font-semibold text-lg text-center">Stock</p>
              <p className="w-[15%] font-semibold text-lg text-center">Price</p>
              <p className="w-[15%] font-semibold text-lg text-center">
                Status
              </p>
              <p className="w-[15%] font-semibold text-lg text-center">
                Action
              </p>
            </div>
            {data?.products?.map((product: any) => {
              return (
                <div
                  className="w-full px-12 py-3 bg-white text-primary rounded-md flex justify-between items-center mb-2 gap-4"
                  key={product._id}
                >
                  <div className="flex items-center gap-3 w-[20%]">
                    <div className="w-16 h-16 p-2 bg-slate-100 relative rounded-md">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <p className="font-semibold text-lg truncate">
                      {product.name}
                    </p>
                  </div>
                  <p className="w-[15%] text-center">
                    {getCategoryNameByLabel(product.category)}
                  </p>
                  <p className="w-[15%] text-center">{product.stock}</p>
                  <p className="w-[15%] text-center">{product.price}</p>
                  <div className="w-[15%] flex items-center justify-center">
                    <StatusComp data={JSON.stringify(product)} />
                  </div>
                  <div className="w-[15%] flex items-center justify-center gap-2">
                    {/* <Button
                      // href={`/admin/products/${product._id}`}
                      className={cn(buttonVariants(), "p-4")}
                    >
                      <PencilRulerIcon />
                    </Button> */}
                    <DeleteBtn id={`${product._id}`} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 w-full flex flex-col items-center justify-center py-10">
            <p className="text-2xl font-bold">No Product Found!</p>
            <p className="text-lg font-medium">
              Click{" "}
              <Link href="/admin/products/create-product" className="underline">
                <span className="text-primary font-semibold">here</span>
              </Link>{" "}
              to make one!
            </p>
          </div>
        )}
        {data.productsInStore !== 0 && data?.totalProducts === 0 && (
          <div className="w-full flex items-start justify-center text-2xl font-semibold p-4">
            <p>Opps Product Not Found!</p>
          </div>
        )}
        {!data && (
          <div className="w-full flex items-start justify-center text-2xl font-semibold p-4">
            <p>Loading plz wait!</p>
          </div>
        )}
      </div>
    </div>
  );
}
