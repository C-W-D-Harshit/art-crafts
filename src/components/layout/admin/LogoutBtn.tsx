"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LogoutBtn() {
  const router = useRouter();
  const logout = async () => {
    signOut({ redirect: false });
    router.push("/");
    toast.success("Logged Out!");
  };
  return (
    <Button size={"lg"} className="gap-2" onClick={logout}>
      <LogOutIcon />
      <p className="text-lg">Logout</p>
    </Button>
  );
}
