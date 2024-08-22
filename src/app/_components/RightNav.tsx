"use client";

import { useState } from "react";

export default function RightNav() {
  const [viewNav, setViewNav] = useState(false);

  return (
    <div className="md:invisible">
      <button
        className="fixed right-9 bg-slate-950 rounded-full min-h-10 min-w-10 text-white font-bold bottom-5 z-50"
        onClick={() => setViewNav(!viewNav)}
      >
        {viewNav ? "<<" : "三"}
      </button>
      <div
        className={`fixed top-0 bg-gray-50 w-56 h-full transition-transform shadow-lg duration-300 z-50 ${
          viewNav ? "translate-x-0" : "-translate-x-[768px]"
        }`}
      />
    </div>
  );
}
