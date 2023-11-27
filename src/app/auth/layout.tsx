"use client";
import React from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session }: { data: any } = useSession();
  if (session) {
    router.push("/");
  }

  return <>{children}</>;
}
