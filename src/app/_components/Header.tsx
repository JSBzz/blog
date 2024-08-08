import Link from "next/link";
import SignIn from "./Auth/HeaderAuth";
import { auth } from "../config/next-auth/auth";
import SignUp from "./Auth/HeaderSignUp";

export default async function Header() {
  const session = await auth();
  return (
    <div className="">
      <div className="flex h-16 align-middle justify-center items-center shadow-md">
        <SignIn session={session} />

        <Link href="/">
          <h1 className="absolute left-3 sm:left-[50%] top-[14px] font-bold text-2xl">Blog</h1>
        </Link>
      </div>
      <SignUp />
    </div>
  );
}
