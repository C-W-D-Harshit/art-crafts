import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="min-h-[calc(100dvh-8rem)] md:min-h-[calc(100dvh-4rem)] w-full flex items-start justify-between">
      <h1>{searchParams.error}</h1>
      <Link href="/auth/login" passHref>
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
