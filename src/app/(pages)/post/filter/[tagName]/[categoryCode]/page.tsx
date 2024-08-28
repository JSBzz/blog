import Main from "@/app/_components/Main/Main";
import { Metadata } from "next";

export async function generateMetadata({ params }: any) {
  return {
    title: decodeURI(`${params?.categoryCode} Post - ${params?.tagName} - JSB Blog`),
    description: `Post List / Tag : ${params?.tagName}, Category : ${params?.categoryCode}`,
  };
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { tagName: string; categoryCode: string };
  searchParams: { q: string };
}) {
  generateMetadata(params);
  return (
    <Main
      categoryCode={params?.categoryCode}
      tagName={params?.tagName}
      searchParam={searchParams?.q}
    />
  );
}
