import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, MoveRightIcon } from "lucide-react";
import CategoryCard from "../cards/CategoryCard";

export default function CategoryHolder() {
  const categories = [
    {
      name: "Bridal Wear",
      label: "bridal_wear",
    },
    {
      name: "Casual Wear",
      label: "casual_wear",
    },
    {
      name: "Engagement",
      label: "engagement",
    },
    {
      name: "Morden Wear",
      label: "morden_wear",
    },
    {
      name: "Office Wear",
      label: "office_wear",
    },
    {
      name: "Traditional & Ethenic Wear",
      label: "traditional&etenic_wear",
    },
    {
      name: "Kids Wear",
      label: "kids_wear",
    },
  ];
  return (
    <div>
      <MaxWidthWrapper>
        <div className="w-full">
          <div className="w-full flex justify-between items-center mb-4">
            <p className="text-xl font-medium">Select Categories</p>
            <Link
              href={"/categories"}
              className="text-md flex items-center gap-x-2 hover:text-blue-500 ease-in-out duration-500"
            >
              <p className="text-md flex items-center">Show all</p>
              <MoveRightIcon size={15} />
            </Link>
          </div>
          <div className="w-full flex items-center gap-x-3 flex-nowrap overflow-x-scroll no-scrollbar">
            {categories?.map((category, index) => (
              <CategoryCard category={category} key={index} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
