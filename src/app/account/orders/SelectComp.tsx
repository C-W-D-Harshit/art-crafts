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

export default function SelectComp() {
  return (
    <div className="w-full flex justify-end my-3">
      <Select defaultValue="pending">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order Status</SelectLabel>
            <SelectItem className="capitalize" value="pending">
              pending
            </SelectItem>
            <SelectItem className="capitalize" value="processing">
              processing
            </SelectItem>
            <SelectItem className="capitalize" value="shipped">
              shipped
            </SelectItem>
            <SelectItem className="capitalize" value="delivered">
              delivered
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
