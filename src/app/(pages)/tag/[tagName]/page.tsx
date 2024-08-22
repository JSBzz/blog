import Main from "@/app/_components/Main/Main";
import { Suspense } from "react";

export default async function Home({
  params,
  searchParams,
}: {
  params: { tagName: string };
  searchParams: { q: string };
}) {
  return <Main categoryCode="ALL" tagName={params?.tagName} searchParam={searchParams?.q} />;
}
