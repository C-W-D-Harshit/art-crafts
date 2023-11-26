import Link from "next/link";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import LogoutBtn from "./LogoutBtn";

export default function Sidebar() {
  return (
    <div className="h-[100dvh] w-[20%] min-w-[20rem] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-10 flex flex-col items-center gap-20">
      <Link href={"/admin"} className="font-bold text-4xl min-w-max logo__">
        Arts & Crafts
      </Link>
      <SidebarMenu />
      <LogoutBtn />
    </div>
  );
}
