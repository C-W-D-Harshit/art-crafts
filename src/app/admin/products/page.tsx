import { getAdminProducts } from "@/actions/productActions";
import Search from "@/components/pages/admin/product/Search";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PlusIcon, SearchIcon } from "lucide-react";
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
  console.log(data);
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
        {data.totalProducts !== 0 ? (
          <div>
            <div></div>
            <div></div>
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
      </div>
    </div>
  );
}
