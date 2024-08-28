import Main from "./_components/Main/Main";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { title: string; description: string };
};

// // set dynamic metadata
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   return {
//     title: params.title,
//     description: params.description,
//   };
// }
// generateMetadata(meta);

export const metadata = {
  title: "Main - JSB Blog",
  description: "This is JSB Blog Hi",
};

export default async function Home({ searchParams }) {
  const meta: Props = { params: { title: "JSB Blog - Main", description: "this is jsb blog hi" } };
  return <Main categoryCode="ALL" tagName="ALL" searchParam={searchParams?.q} />;
}
