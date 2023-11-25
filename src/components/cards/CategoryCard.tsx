import Link from "next/link";
import React from "react";

export default function CategoryCard({
  category: { name, label },
}: {
  category: { name: string; label: string };
}) {
  return (
    <Link
      href={`/categories/${label}`}
      className="w-44 min-w-[11rem] md:min-w-[13.6%] h-44 bg-slate-100 rounded-md flex items-center justify-center p-5 text-center group"
    >
      <p className="text-2xl font-semibold group-hover:scale-110 group-hover:text-blue-500 duration-700 ease-in-out transition-all">
        {name}
      </p>
    </Link>
  );
}
