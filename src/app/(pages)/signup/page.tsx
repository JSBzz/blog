"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Modal() {
  const router = useRouter();
  useEffect(() => {
    router.back();
    router.push("/signup");
  }, [router]);
}
