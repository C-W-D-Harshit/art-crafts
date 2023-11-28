"use client";
import { deleteProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import React from "react";

export default function DeleteBtn({ id }: { id: string }) {
  const handleDelete = async (id: string) => {
    await deleteProductAction(id);
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
