"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterButtons = [
  {
    text: "all cabins",
    filter: "all",
  },
  {
    text: "1\u20143 cabins",
    filter: "small",
  },
  {
    text: "4\u20147 cabins",
    filter: "medium",
  },
  {
    text: "8\u201412 cabins",
    filter: "large",
  },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const active = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      {filterButtons.map((btn) => (
        <button
          key={btn.filter}
          onClick={() => handleFilter(btn.filter)}
          className={`cursor-pointer px-5 py-2 hover:bg-primary-700 ${active === btn.filter ? "bg-primary-700 text-primary-50" : ""}`}
        >
          {btn.text}
        </button>
      ))}
    </div>
  );
}
