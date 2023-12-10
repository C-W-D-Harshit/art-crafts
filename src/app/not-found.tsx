import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[94dvh] justify-center items-center gap-6 md:gap-8 flex flex-col">
      <p className="md:text-9xl text-6xl font-extrabold">404</p>
      <div className="text-center">
        <h1 className="font-bold text-2xl md:text-4xl mb-1">
          Oops! Page not found
        </h1>
        <h3 className="font-semibold text-slate-700 text-base md:text-lg">
          The page you are looking for might have been removed or temporarily
          unavailable.
        </h3>
      </div>
      <Link href={"/shop"} className={buttonVariants({ size: "lg" })}>
        Continue Shopping
      </Link>
    </div>
  );
}
