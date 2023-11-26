"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeftRightIcon,
  BarChart2Icon,
  LayoutDashboardIcon,
  ShoppingBag,
  ShoppingBasketIcon,
  TruckIcon,
  UserSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuItem {
  icon: React.ReactNode; // Assuming BiSolidDashboard returns React components
  text: string;
  link: string;
}

export default function SidebarMenu() {
  const path = usePathname();
  const data: MenuItem[] = [
    {
      icon: <LayoutDashboardIcon />,
      text: "overview",
      link: "/admin",
    },
    {
      icon: <ShoppingBag />,
      text: "orders",
      link: "/admin/orders",
    },
    {
      icon: <ShoppingBasketIcon />,
      text: "products",
      link: "/admin/products",
    },
    {
      icon: <UserSquare />,
      text: "customers",
      link: "/admin/customers",
    },
    {
      icon: <BarChart2Icon />,
      text: "reports",
      link: "/admin/reports",
    },
    {
      icon: <ArrowLeftRightIcon />,
      text: "transactions",
      link: "/admin/transactions",
    },
    {
      icon: <TruckIcon />,
      text: "Shipment",
      link: "/admin/shipment",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center ">
      {data.map((item, index) => {
        return (
          <Link
            href={item.link}
            key={index}
            className={cn(
              "capitalize font-semibold text-2xl relative py-3 w-full hover:bg-slate-100  ",
              {
                "bg-slate-100": path === item.link,
              }
            )}
          >
            <div className="px-16 flex items-center gap-3">
              {item.icon}
              <p className="">{item.text}</p>
            </div>
            <div
              className={cn(
                "absolute right-0 h-full w-2  rounded-tl-lg rounded-bl-lg top-0",
                {
                  "bg-primary": path === item.link,
                }
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
