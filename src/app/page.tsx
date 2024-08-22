import Main from "./_components/Main/Main";
import { auth } from "./config/next-auth/auth";

export default async function Home({ searchParams }) {
  await auth();
  console.log("await auth(): ", await auth());
  return <Main categoryCode="ALL" tagName="ALL" searchParam={searchParams?.q} />;
}
