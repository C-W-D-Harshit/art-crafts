"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Search({ searchParams }: any) {
  console.log(searchParams.q);

  const router = useRouter();
  const [query, setQuery] = useState(searchParams.q ?? "");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/admin/products?q=${query}`);
  };
  return (
    <form
      className="w-96 flex items-center gap-2 border border-slate-500 bg-slate-50 p-2 rounded-md"
      onSubmit={submitHandler}
    >
      <SearchIcon size={20} />
      <input
        type="text"
        name="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        defaultValue={query}
      />
    </form>
  );
}
