import Main from "@/app/_components/Main/Main";

export default async function Home({
  params,
  searchParams,
}: {
  params: { tagName: string; categoryCode: string };
  searchParams: { q: string };
}) {
  return (
    <Main
      categoryCode={params?.categoryCode}
      tagName={params?.tagName}
      searchParam={searchParams?.q}
    />
  );
}
