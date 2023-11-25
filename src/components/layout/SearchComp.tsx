"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchComp() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/shop?q=${query}`);
      }}
    >
      <div className="flex items-center gap-x-3 px-2 py-2 bg-slate-100 rounded-md">
        <Search size={"20"} />
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}
