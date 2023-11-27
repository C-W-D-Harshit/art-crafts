"use client";

import { BellDotIcon, BellIcon, ChevronDown, StoreIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);
  const path = usePathname();
  const data = [
    {
      path: "/admin/index",
      title: "Dashboard",
      description: "Detailed information about your store",
    },
    {
      path: "/admin/orders",
      title: "Orders",
      description: "Manage and view orders placed by customers",
    },
    {
      path: "/admin/products",
      title: "Products",
      description: "Add, edit, and manage your store's products",
    },
    {
      path: "/admin/customers",
      title: "Customers",
      description: "Manage your customer base and their information",
    },
    {
      path: "/admin/reports",
      title: "Reports",
      description: "View detailed reports and analytics",
    },
    {
      path: "/admin/transactions",
      title: "Transactions",
      description: "View and manage financial transactions",
    },
    {
      path: "/admin/shipment",
      title: "Shipment",
      description: "Track and manage shipments and deliveries",
    },
  ];

  const foundItems = data.filter((item) => {
    if (path === "/admin") {
      return item.path === path;
    } else {
      return path.startsWith(item.path);
    }
  });

  const userName = session?.user?.name as string;

  const userInitials = session?.user?.name ? session?.user?.name[0] : "S";

  function extractFirstName(username: string): string | null {
    // Define the separator character (e.g., underscore or space)
    const separator = " "; // Change this to the appropriate separator

    // Split the username into parts based on the separator
    const parts = username.split(separator);

    // Check if there is at least one part (the first name)
    if (parts.length > 0) {
      return parts[0]; // The first part is the first name
    } else {
      return null; // No first name found
    }
  }

  const firstName = session?.user ? extractFirstName(userName) : "User";

  const userImage = session?.user?.image || "/defaults/user.avif";

  const logout = async () => {
    signOut({ redirect: false });
    router.push("/");
    toast.success("Logged Out!");
  };
  return (
    <div className="flex items-center justify-between">
      {foundItems.length > 0 ? (
        foundItems.map((item) => (
          // Render content when a match is found
          <div key={item.path}>
            <p className="text-3xl mb-1 font-bold">{item.title}</p>
            <p className="text-sm font-medium text-slate-500">
              {item.description}
            </p>
          </div>
        ))
      ) : (
        // Render "Not Found" message only once
        <div>
          <p className="text-3xl mb-1 font-bold">Dashboard</p>
          <p className="text-sm font-medium text-slate-500">
            Detailed information about your store
          </p>
        </div>
      )}
      <div className="flex items-center gap-10">
        <Link href="/admin/notifications" className="relative">
          <BellIcon />
          <span className="absolute top-0 right-[-2px] w-1.5 h-1.5  rounded-full bg-primary" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={userImage} alt="@shadcn" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-semibold">{firstName}</p>
                  <ChevronDown size={20} />
                </div>
                <p className="text-base font-medium text-slate-500">Admin</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Store</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/">
                <DropdownMenuItem>
                  <StoreIcon className="mr-2 h-4 w-4" />
                  <span>Visit Store</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/admin/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
