import Link from "next/link";
import SignIn from "./Auth/HeaderAuth";
import { auth } from "../config/next-auth/auth";
import SignUp from "./Auth/HeaderSignUp";

export default async function Header() {
  const session = await auth();
  return (
    <div className="sticky top-0 z-50">
      <div className=" bg-white opacity-95  backdrop-blur-3xl">
        <div className="flex h-16 align-middle items-center shadow-md justify-between sticky top-0">
          <SignIn session={session} />
          <Link href="/">
            <h1 className="font-bold text-2xl ml-6">Blog</h1>
          </Link>
        </div>
        <SignUp />
      </div>
      {session?.user?.role == "admin" && (
        <div className="bg-slate-50 p-1">
          <Link href={`${process.env.NEXT_PUBLIC_ROOT_URL}/category`}>카테고리 추가</Link>
        </div>
      )}
    </div>
  );
}
