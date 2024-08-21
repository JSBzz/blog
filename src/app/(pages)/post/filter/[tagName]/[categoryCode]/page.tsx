import Main from "@/app/_components/Main/Main";

export default async function Home({
  params,
  searchParams,
}: {
  params: { tagName: string; categoryCode: string };
  searchParams: any;
}) {
  return (
    <Main
      categoryCode={params?.categoryCode}
      tagName={params?.tagName}
      searchParam={searchParams?.q}
    />
  );
}
