"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import useCartStore from "@/store/cart";
import useStore from "@/store/store";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { addressSchema } from "@/schema/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Page() {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const cartQuantity: any = useStore(
    useCartStore,
    (state) => state.cartQuantity
  );
  const cartTotalPrice = useStore(
    useCartStore,
    (state) => state.cartTotalPrice
  );

  const { data: session, update }: { data: any; update: any } = useSession();
  let ses: any = session;

  //   const { addToCart, removeFromCart, clearCart, decreaseQuantityInCart } = useCartStore();

  // now checkout the cart
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<addressSchema>({
    resolver: zodResolver(addressSchema),
  });

  useMemo(() => {
    if (!session?.user) return null;

    reset({
      name: session?.user.name,
      email: session?.user.email,
      phoneNumber: session?.user.phoneNumber ?? "",
    });
  }, [session?.user, reset]);
  console.log(ses);
  const onSubmit = async (data: addressSchema) => {
    console.log(data);
  };
  return (
    <div className="w-full min-h-screen">
      <MaxWidthWrapper className="my-6">
        <div className="hidden w-full md:flex  font-medium items-center gap-2 capitalize mb-8 text-slate-600">
          <Link href={"/"}>
            <p className="min-w-max">Home</p>
          </Link>
          <ChevronRightIcon />
          <Link href={`/shop`}>
            <p className="min-w-max">Shop</p>
          </Link>
          <ChevronRightIcon />
          <p className="min-w-max">Checkout</p>
        </div>
        <div className="flex h-14 items-center gap-3 mb-2">
          <div className="w-1.5 bg-primary h-full rounded-lg" />
          <p className="font-bold text-2xl md:text-3xl">Check Out</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col md:flex-row gap-4 md:gap-12"
        >
          <div className="w-full h-full p-3">
            <div className="w-full mb-2">
              <input type="submit" hidden />
              <h3 className="text-xl font-semibold md:text-2xl mb-3">
                Billing Details
              </h3>
              <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-2 md:mb-6">
                <div className="w-full">
                  {errors.name ? (
                    <p className="text-lg font-semibold mb-1 text-red-500">
                      {errors.name.message}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold mb-1">Full name</p>
                  )}
                  <input
                    type="text"
                    placeholder="First Name"
                    className={cn(
                      "p-2 px-3 bg-slate-100 rounded-lg focus:border-primary border transition-all duration-300",
                      {
                        "focus:border-destructive": errors.name,
                      }
                    )}
                    {...register("name")}
                  />
                </div>
                <div className="w-full">
                  {errors.email ? (
                    <p className="text-lg font-semibold mb-1 text-red-500">
                      {errors.email.message}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold mb-1">Email</p>
                  )}
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={cn(
                      "p-2 px-3 bg-slate-100 rounded-lg focus:border-primary border transition-all duration-300",
                      {
                        "focus:border-destructive": errors.email,
                      }
                    )}
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-2 md:mb-6">
                <div className="w-full">
                  {errors.phoneNumber ? (
                    <p className="text-lg font-semibold mb-1 text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold mb-1">Phone Number</p>
                  )}
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className={cn(
                      "p-2 px-3 bg-slate-100 rounded-lg focus:border-primary border transition-all duration-300",
                      {
                        "focus:border-destructive": errors.phoneNumber,
                      }
                    )}
                    {...register("phoneNumber", { valueAsNumber: true })}
                  />
                </div>
                <div className="w-full">
                  {errors.city ? (
                    <p className="text-lg font-semibold mb-1 text-red-500">
                      {errors.city.message}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold mb-1">City</p>
                  )}
                  <input
                    type="text"
                    placeholder="City"
                    className={cn(
                      "p-2 px-3 bg-slate-100 rounded-lg focus:border-primary border transition-all duration-300",
                      {
                        "focus:border-destructive": errors.city,
                      }
                    )}
                    {...register("city")}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-2 md:mb-6">
                <div className="w-full">
                  {errors.state ? (
                    <p className="text-lg font-semibold mb-1 text-red-500">
                      {errors.state.message}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold mb-1">State</p>
                  )}
                  <input
                    type="text"
                    placeholder="State"
                    className={cn(
                      "p-2 px-3 bg-slate-100 rounded-lg focus:border-primary border transition-all duration-300",
                      {
                        "focus:border-destructive": errors.state,
                      }
                    )}
                    {...register("state")}
                  />
                </div>
                <div className="w-full">
                  {errors.address ? (
                    <p className="text-lg font-semibold mb-1 text-red-500">
                      {errors.address.message}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold mb-1">Address</p>
                  )}
                  <Textarea
                    placeholder="Address"
                    className={cn(
                      "p-2 px-3 bg-slate-100 rounded-lg focus:border-primary border transition-all duration-300",
                      {
                        "focus:border-destructive": errors.address,
                      }
                    )}
                    {...register("address")}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-2 md:mb-6">
                <div className="md:w-1/2 w-full">
                  {errors.postalCode ? (
                    <p className="text-lg font-semibold mb-1 text-red-500">
                      {errors.postalCode.message}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold mb-1">Postal Code</p>
                  )}
                  <input
                    type="number"
                    placeholder="Postal Code"
                    className={cn(
                      "p-2 px-3 bg-slate-100 rounded-lg focus:border-primary border transition-all duration-300",
                      {
                        "focus:border-destructive": errors.postalCode,
                      }
                    )}
                    {...register("postalCode", { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
            <div className="w-full my-2">
              <input type="submit" hidden />
              <h3 className="text-xl font-semibold md:text-2xl">
                Payment Method
              </h3>
              <p className="mb-6 text-base font-medium text-slate-500">
                All transactions are secured and encrypted.
              </p>
              <div className="w-full bg-slate-100 p-6 rounded-lg">
                <RadioGroup defaultValue="cod">
                  <div className="w-full flex items-center gap-3 md:gap-6">
                    <RadioGroupItem value="cod" id="cod" />
                    <div>
                      <p className="text-lg font-semibold">Cash on delivery</p>
                      <p>Pay with cash upon delivery.</p>
                    </div>
                  </div>
                  <Separator className="my-2 md:my-4" />
                  <div className="w-full flex items-center gap-3 md:gap-6">
                    <RadioGroupItem value="online" id="online" />
                    <div>
                      <p className="text-lg font-semibold">Pay Online</p>
                      <p>Pay with online with Razorpay Payment gateway.</p>
                    </div>
                  </div>
                </RadioGroup>
                <div className="w-full flex items-center"></div>
              </div>
            </div>
          </div>
          <div className="md:w-[45%] w-full p-6 py-7 h-full border border-slate-300 rounded-lg ">
            <h3 className="md:text-2xl text-2xl font-semibold">
              Order Summary
            </h3>
            <Separator className="my-6" />
            <div className="mb-6 w-full">
              {cartItems?.map((cartItem, index) => (
                <div key={index} className="w-full mb-3">
                  <div className="w-full flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-24 h-24">
                        <Image
                          src={cartItem.image}
                          alt=""
                          fill
                          className="object-contain p-2 rounded-lg bg-slate-100"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold truncate w-32 md:w-48">
                          {cartItem.name}
                        </p>
                        <p className="text-slate-700 font-medium">
                          <span className="text-base font-semibold text-primary">
                            Size:{" "}
                          </span>
                          {cartItem.size}
                        </p>
                        <p className="text-slate-700 font-medium">
                          <span className="text-base font-semibold text-primary">
                            Quantity:{" "}
                          </span>
                          {cartItem.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-base font-semibold text-slate-600">
                      ₹{cartItem.price}
                    </p>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="font-semibold text-lg">Subtotal</p>
              <p className="font-medium text-base">₹{cartTotalPrice}</p>
            </div>
            <div className="w-full flex items-center justify-between mb-6">
              <p className="font-semibold text-lg">Delivery</p>
              <p className="font-medium text-base">₹40</p>
            </div>
            <Separator className="mb-6" />
            <div className="w-full flex items-center justify-between mb-6">
              <p className="font-semibold text-lg">Total</p>
              <p className="font-medium text-base">
                ₹{(cartTotalPrice as number) + 40}
              </p>
            </div>
          </div>
        </form>
      </MaxWidthWrapper>
    </div>
  );
}
