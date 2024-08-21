import Main from "@/app/_components/Main/Main";

export default async function Home({
  params,
  searchParams,
}: {
  params: { tagName: string };
  searchParams: any;
}) {
  return <Main categoryCode="ALL" tagName={params?.tagName} searchParam={searchParams?.q} />;
}
