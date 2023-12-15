import React from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{searchParams.id}</h1>
    </div>
  );
}
