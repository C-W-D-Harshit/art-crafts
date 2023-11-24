import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

export default function Hero() {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="w-full lg:h-[24rem] h-44 bg-slate-100 rounded-lg"></div>
      </MaxWidthWrapper>
    </div>
  );
}
