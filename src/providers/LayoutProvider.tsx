"use client";

import MobBar from "@/components/layout/MobBar";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  if (path.startsWith("/admin")) {
    return <div className="flex-grow flex-1 ">{children}</div>;
  }
  return (
    <>
      <Navbar />
      <div className="flex-grow flex-1 ">{children}</div>
      <MobBar />
    </>
  );
}
