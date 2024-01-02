"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
//sd
export default function SelectComp() {
  const router = useRouter();
  const status = ["pending", "processing", "shipped", "delivered", "cancelled"];
  return (
    <div className="w-full flex justify-end my-3">
      <Select
        defaultValue="pending"
        onValueChange={(e) => router.push(`/account/orders?status=${e}`)}
      >
        <SelectTrigger className="w-[180px] capitalize">
          <SelectValue className="capitalize" placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order Status</SelectLabel>
            {status.map((item, index) => (
              <SelectItem className="capitalize" value={item} key={index}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
