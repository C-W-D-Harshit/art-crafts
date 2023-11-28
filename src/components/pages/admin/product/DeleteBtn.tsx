"use client";
import { deleteProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function DeleteBtn({ id }: { id: string }) {
  const handleDelete = async (id: string) => {
    const result: any = await deleteProductAction(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
    }
  };
  return (
    <Button
      variant={"secondary"}
      className={cn("text-red-500")}
      onClick={() => handleDelete(id)}
    >
      <TrashIcon />
    </Button>
  );
}
