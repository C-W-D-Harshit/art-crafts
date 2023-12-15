import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="w-full min-h-screen">
      <MaxWidthWrapper>
        <div className="w-full min-h-screen flex flex-col items-center justify-center pb-12 md:pb-20">
          <h2 className="font-bold text-green-500 text-4xl md:text-6xl md:mb-6 mb-6">
            Order Completed!
          </h2>
          <Link
            href={`/account/orders/${searchParams.id ?? ""}`}
            className="hover:underline hover:text-blue-500"
          >
            <h4 className="font-medium text-lg">
              <span className="font-bold">Order ID: </span>
              {searchParams.id ?? ""}
            </h4>
          </Link>
          <Link href={`/shop`} className="my-6">
            <Button size={"lg"}>Continue Shopping</Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
