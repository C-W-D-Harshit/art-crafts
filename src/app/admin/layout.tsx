import Header from "@/components/layout/admin/Header";
import Sidebar from "@/components/layout/admin/Sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white h-[100dvh] w-full overflow-hidden flex">
      <Sidebar />
      <div className="w-[100%] bg-slate-100 py-10 px-10 min-h-[100dvh] overflow-auto flex flex-col gap-6">
        <Header />
        {children}
      </div>
    </div>
  );
}
