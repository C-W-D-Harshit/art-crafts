/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/userSchema";
import toast from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  //   const {
  //     data: session,
  //     status,
  //   }: { data: any; status: "authenticated" | "loading" | "unauthenticated" } =
  //     useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const gg = async (email: string, password: string) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    const result: any = await signIn("credentials", {
      redirect: false, // Set to false to handle redirect manually
      email,
      password,
    });
    // Check if sign-in was successful
    if (result.error) {
      // Handle sign-in error (display error message, etc.)
      // console.log(result.error);
      // toast.error(result.error);
      throw new Error(result.error);
    } else {
      // Sign-in was successful, handle redirect or other actions
      router.push("/");
    }
    return result;
  };

  const submitHandler = async (data: loginSchema) => {
    const { email, password } = data;

    // Define a minimum delay of 0.8 seconds (2000 milliseconds)
    const minimumDelay = 800;

    // Delay the execution of gg function
    await new Promise((resolve) => {
      setTimeout(resolve, minimumDelay);
    });

    // Trigger the sign-in process
    const fg: any = gg(email, password);

    toast.promise(
      fg
        .then((result: any) => {
          // Handle success

          return result; // Pass the result to the success callback
        })
        .catch((error: any) => {
          // Handle error and get the error message
          console.error(error.message);
          return Promise.reject(error); // Pass the error to the error callback
        }),
      {
        loading: "Logging you in...",
        error: (error) => {
          // Display the error message using toast.error
          // toast.error(error.message);
          return error.message; // Return the error message
        },
        success: "Logged In Successfully....",
      }
    );
  };

  const login = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: process.env.NEXT_PUBLIC_URL,
      });
      toast.loading("Logging in...!");
    } catch (error: any) {
      // Handle errors, possibly by displaying an error message using toast.error() or other means
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-[100%] bg-white md:w-[40%] px-6 md:px-48 py-1 md:py-6 overflow-hidden flex flex-col items-center justify-between">
      <div className="flex flex-col items-center w-full mt-8 md:mt-4">
        <p className="text-2xl font-semibold mb-8 md:mb-12">
          Hi, Welcome Back! 👋
        </p>
        <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full">
              <p
                className={cn("mb-1 font-medium text-lg", {
                  "text-red-500": errors.email,
                })}
              >
                {errors.email ? errors.email.message : "Email"}
              </p>
              <div className="w-full border-2 rounded-md px-4 py-2 hover:border-blue-500 transition-all ease-out duration-700 focus-within:border-blue-500">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="w-full mb-2">
              <p
                className={cn("mb-1 font-medium text-lg", {
                  "text-red-500": errors.password,
                })}
              >
                {errors.password ? errors.password.message : "Password"}
              </p>
              <div className="w-full border-2 rounded-md px-4 py-2 hover:border-blue-500 transition-all ease-out duration-700 focus-within:border-blue-500">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>
            </div>
            <Button size={"lg"} className="text-lg">
              Login
            </Button>
          </div>
        </form>
        <div className="relative flex w-full items-center justify-center my-12">
          <div className="border-b w-full h-[1px]" />
          <p className="mx-3 font-medium">Or</p>
          <div className="border-b w-full h-[1px]" />
        </div>
        <div className="w-full">
          <Button
            variant={"secondary"}
            size={"lg"}
            className="text-lg w-full flex gap-4"
            onClick={() => login("google")}
          >
            <FcGoogle />
            <p>Login With Google</p>
          </Button>
        </div>
      </div>
      <div className="w-full mb-2">
        <p className="text-center text-lg">
          Don't have an account?{" "}
          <span className="text-blue-500">
            <Link href="/auth/sign-up">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
