"use client";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
export default function SearchBar({ href }: { href: string }) {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="w-fit flex m-auto rounded-l-md mt-4 p-1 bg-white border dark:bg-slate-800">
      <input
        className="rounded-l-md pl-2 h-8 outline-none"
        placeholder="Search"
        onChange={(e) => {
          console.log("e.target.value: ", e.target.value);
          setSearchText(e.target.value);
        }}
      />
      <Link href={`${href}?q=${searchText}`}>
        <CiSearch size={"30"} color="gray" />
      </Link>
    </div>
  );
}
