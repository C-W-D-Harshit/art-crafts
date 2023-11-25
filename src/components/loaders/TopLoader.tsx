"use client";
import React, { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";
import * as NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // React.useEffect(() => {
  //   NProgress.done();
  // }, [pathname, router, searchParams]);
  return <NextTopLoader showSpinner={false} color="#0f172a" />;
}
