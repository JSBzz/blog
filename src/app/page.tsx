import Main from "./_components/Main/Main";

export default async function Home({ searchParams }) {
  return <Main categoryCode="ALL" tagName="ALL" searchParam={searchParams?.q} />;
}
