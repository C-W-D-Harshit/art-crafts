"use client";

import { updateStatus } from "@/actions/productActions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function StatusComp({ data }: any) {
  const product = JSON.parse(data);
  const handleStatus = async (status: string) => {
    const result: any = await updateStatus({ id: product.id, status });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
    }
  };
  return (
    <Select onValueChange={(e) => handleStatus(e)}>
      <SelectTrigger className="w-full capitalize  bg-slate-50 border border-slate-300">
        <SelectValue
          className="capitalize"
          placeholder={product.status + "ed"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <Separator />

          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="publish">Publish</SelectItem>
          <SelectItem value="archive">Archive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
