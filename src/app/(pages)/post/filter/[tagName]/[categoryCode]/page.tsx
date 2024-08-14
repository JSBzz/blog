import Main from "@/app/_components/Main/Main";

export default async function Home({
  params,
}: {
  params: { tagName: string; categoryCode: string };
}) {
  return <Main categoryCode={params?.categoryCode} tagName={params?.tagName} />;
}
