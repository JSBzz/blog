"use client";

import { useTheme } from "next-themes";

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(theme == "dark" ? "lignht" : "dark");
      }}
    >
      Dark Mode
    </button>
  );
}
