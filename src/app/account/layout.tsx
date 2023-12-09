"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import {
  BriefcaseIcon,
  ChevronRightIcon,
  HeartIcon,
  LockIcon,
  LogOutIcon,
  User2Icon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  //   if (!session) {
  //     router.push("/");
  //   }
  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  let ses: any = session;
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
  const userName = session?.user?.name as string;
  const firstName = session?.user ? extractFirstName(userName) : "User";
  const menu = [
    {
      icon: <User2Icon />,
      link: "/account",
      label: "My Info",
    },
    {
      icon: <BriefcaseIcon />,
      link: "/account/orders",
      label: "My Orders",
    },
    {
      icon: <HeartIcon />,
      link: "/account/wishlist",
      label: "Wishlist",
    },
  ];
  const logout = async () => {
    signOut({ redirect: false });
    router.push("/");
    toast.success("Logged Out!");
  };
  return (
    <main className="w-full min-h-screen py-6 md:py-12">
      <MaxWidthWrapper className="w-full h-full">
        <div className="hidden w-full md:flex  font-medium items-center gap-2 capitalize mb-8 text-slate-600 select-none">
          <Link href={"/"}>
            <p className="min-w-max">Home</p>
          </Link>
          <ChevronRightIcon />
          <Link href={`/account`}>
            <p className="min-w-max">My Account</p>
          </Link>
          <ChevronRightIcon />
          <p className="min-w-max">
            {path === "/account" ? "Personal Info" : "My Orders"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-16">
          <div className="w-full md:w-[24rem] ">
            <div className="flex gap-5 h-12 items-center mb-3">
              <div className="h-full w-1.5 bg-primary rounded-md" />
              <p className="text-3xl font-bold min-w-max">Hello {firstName}</p>
            </div>
            <p className="min-w-max font-semibold mb-6 md:mb-12">
              Welcome to your Account
            </p>
            <div className="w-full hidden md:block">
              {menu.map((item, index) => {
                const pat = item.link;
                return (
                  <Link
                    href={pat}
                    key={index}
                    className={cn(
                      "w-full h-12 flex items-center hover:bg-slate-50 mb-1 rounded-lg cursor-pointer select-none",
                      {
                        "bg-slate-50": pat === path,
                      }
                    )}
                  >
                    <div
                      className={cn("mr-8 w-1 h-full ", {
                        " bg-slate-700": pat === path,
                      })}
                    />
                    <div className="flex gap-4 items-center">
                      {item.icon}
                      <p className="min-w-max text-lg font-medium">
                        {item.label}
                      </p>
                    </div>
                  </Link>
                );
              })}
              <div
                onClick={() => router.push("/admin")}
                className={cn(
                  "w-full h-12 hidden items-center hover:bg-slate-50 mb-1 rounded-lg cursor-pointer select-none",
                  {
                    flex: ses?.user?.role === "admin",
                  }
                )}
              >
                <div className={cn("mr-8 w-1 h-full ")} />
                <div className="flex gap-4 items-center">
                  <LockIcon />
                  <p className="min-w-max text-lg font-medium">Admin Panel</p>
                </div>
              </div>
              <div
                onClick={logout}
                className={cn(
                  "w-full h-12 flex items-center hover:bg-slate-50 mb-1 rounded-lg cursor-pointer select-none"
                )}
              >
                <div className={cn("mr-8 w-1 h-full ")} />
                <div className="flex gap-4 items-center">
                  <LogOutIcon />
                  <p className="min-w-max text-lg font-medium">Log Out</p>
                </div>
              </div>
            </div>
            <div className="w-full md:hidden flex flex-wrap overflow-hidden overflow-x-auto gap-4">
              {menu.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className={cn(
                      "flex items-center gap-3 rounded-md border border-slate-300 px-3 py-2",
                      {
                        "bg-slate-100 border-slate-500": item.link === path,
                      }
                    )}
                  >
                    {item.icon}
                    <p className="min-w-max font-semibold">{item.label}</p>
                  </Link>
                );
              })}
              <div
                className={cn(
                  "hidden items-center gap-3 rounded-md border border-slate-300 px-3 py-2",
                  {
                    flex: ses?.user.role === "admin",
                  }
                )}
                onClick={() => router.push("/admin")}
              >
                <LockIcon />
                <p className="min-w-max font-semibold">Admin Panel</p>
              </div>
              <div
                onClick={logout}
                className={cn(
                  "flex items-center gap-3 rounded-md border border-slate-300 px-3 py-2"
                )}
              >
                <LogOutIcon />
                <p className="min-w-max font-semibold">Log Out</p>
              </div>
            </div>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
