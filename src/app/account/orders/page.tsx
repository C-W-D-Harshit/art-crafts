import React, { Suspense } from "react";
import SelectComp from "./SelectComp";
import { getOrders } from "@/actions/orderActions";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductsByIds } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function OrderCard({ data }: any) {
  return (
    <div className="w-full my-2 gap-5 md:gap-6 flex items-center">
      <div className="w-full flex items-center gap-4 overflow-hidden overflow-x-auto no-scrollbar flex-nowrap">
        {data?.products?.map((product: any) => (
          <div key={product.productID} className="flex items-center gap-3">
            <div className="w-28 h-32 md:w-36 md:h-40 relative p-2 bg-slate-50 rounded-lg">
              <Image
                src={product.image}
                alt="img"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="w-40">
              <p className="text-xl font-semibold truncate">{product.name}</p>
              <p className="text-base font-medium">
                <span className="font-semibold">Size: </span>
                {product.size}
              </p>
              <p className="text-base font-medium">
                <span className="font-semibold">Quantity: </span>
                {product.quantity}
              </p>
              <p className="text-base font-medium">
                <span className="font-semibold">Total Price: </span>₹
                {product.totalPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link href={`/account/orders/${data?._id}`}>
        <Button>View Details</Button>
      </Link>
    </div>
  );
}

async function OrderHolder({ searchParams }: any) {
  const data = await getOrders(searchParams);
  console.log(data);
  if (data.numOfResults === 0) {
    return <h1>No Orders Found!</h1>;
  }
  return (
    <div className="w-full">
      {data?.orders.map((order: any) => {
        function formatMongoDBDate(createdAt: any) {
          if (!createdAt) {
            return "Invalid date";
          }

          const options: any = {
            day: "numeric",
            month: "long",
            year: "numeric",
          };
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(new Date(createdAt));

          return formattedDate;
        }
        return (
          <div key={order._id} className="my-6 md:my-10">
            <div className="rounded-lg px-6 p-6 bg-slate-100">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                <span className="font-bold">Order ID: </span>
                {JSON.parse(JSON.stringify(order._id))}
              </h3>
              <div className="flex w-full items-baseline flex-col md:flex-row justify-between">
                <div>
                  <p className="text-base font-medium">
                    <span className="font-semibold">Order Date: </span>
                    {formatMongoDBDate(order.createdAt)}
                  </p>
                  <p className="text-base font-medium capitalize">
                    <span className="font-semibold">Order Status: </span>
                    {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-base font-medium capitalize">
                    <span className="font-semibold">Payment Method: </span>
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
            <OrderCard data={order} key={order._id} />
          </div>
        );
      })}
    </div>
  );
}

function OrderHolderLoading() {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-64 mb-1 rounded-2xl" />
    </div>
  );
}

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-3">My Orders</h2>
      <div className="w-full mb-3">
        <SelectComp />
      </div>
      <Suspense fallback={<OrderHolderLoading />}>
        <OrderHolder searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
