import { getAdminProducts } from "@/actions/productActions";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategoryNameByLabel } from "@/data/category";
import { cn } from "@/lib/utils";
import { PencilRulerIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductTable(searchParams: any) {
  const data = await getAdminProducts(searchParams);
  return (
    <>
      {data.productsInStore !== 0 ? (
        <div className="w-full  ">
          <div className="w-full px-12 py-3 bg-primary rounded-md text-white flex justify-between items-center mb-2 gap-4">
            <p className="w-[20%] font-semibold text-lg">Product</p>
            <p className="w-[15%] font-semibold text-lg text-center">
              Categories
            </p>
            <p className="w-[15%] font-semibold text-lg text-center">Stock</p>
            <p className="w-[15%] font-semibold text-lg text-center">Price</p>
            <p className="w-[15%] font-semibold text-lg text-center">Status</p>
            <p className="w-[15%] font-semibold text-lg text-center">Action</p>
          </div>
          {data.products.map((product: any) => {
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
                  <p className="font-semibold text-lg">{product.name}</p>
                </div>
                <p className="w-[15%] text-center">
                  {getCategoryNameByLabel(product.category)}
                </p>
                <p className="w-[15%] text-center">{product.stock}</p>
                <p className="w-[15%] text-center">{product.price}</p>
                <div className="w-[15%] flex items-center justify-center">
                  <Badge className="capitalize  text-center">
                    {product.status}
                  </Badge>
                </div>
                <div className="w-[15%] flex items-center justify-center gap-2">
                  <Link
                    href={`/admin/products/${product._id}`}
                    className={cn(buttonVariants(), "p-4")}
                  >
                    <PencilRulerIcon />
                  </Link>
                  <Button variant={"secondary"} className={cn("text-red-500")}>
                    <TrashIcon />
                  </Button>
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
      {data.totalProducts === 0 && (
        <div className="w-full flex items-start justify-center text-2xl font-semibold p-4">
          <p>Opps Product Not Found!</p>
        </div>
      )}
    </>
  );
}
