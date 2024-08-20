import Main from "@/app/_components/Main/Main";

export default async function Home({ params }: { params: { tagName: string } }) {
  return <Main categoryCode="ALL" tagName={params?.tagName} />;
}
