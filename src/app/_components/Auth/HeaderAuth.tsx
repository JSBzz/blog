"use client";
import {
  signInWithCredentials,
  signInWithGoogle,
  signOutWithForm,
} from "@/app/config/next-auth/authAction";
import { Session } from "next-auth";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import Link from "next/link";

const loginError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export default function SignIn({ session }: { session: Session | null }) {
  const [credential, setCredential] = useState({ username: "", password: "" });

  if (session?.user) {
    return (
      <form className="absolute right-6 grid grid-rows-2" action={signOutWithForm}>
        {session.user.provider == "credential" ? (
          <span>{`${session.user.id} (${session.user.nickname})`}</span>
        ) : (
          <span>{`${session.user?.email} (${session.user.provider})`}</span>
        )}
        <div className="w-full text-center">
          <button className="bg-blue-200 text-blue-800 justify-center rounded-md w-fit pr-1 pl-1">
            로그아웃
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      <form
        className="grid grid-cols-[144px,60px] mr-4"
        action={async (e) => {
          const result = await signInWithCredentials(e);
          if (!result?.status) loginError(result?.message);
        }}
      >
        <div className="flex flex-col w-36 border">
          <input
            type="text"
            placeholder="id"
            name="username"
            className="p-1 pl-2 h-6"
            value={credential.username}
            onChange={(e) => {
              setCredential({ ...credential, username: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            className="p-1 pl-2 h-6"
            value={credential.password}
            onChange={(e) => {
              setCredential({ ...credential, password: e.target.value });
            }}
          />
        </div>
        <div className="w-full h-full">
          <button className="bg-slate-200 w-full h-full rounded-r-md p-2 text-slate-600 hover:bg-slate-300 active:bg-slate-400">
            Login
          </button>
        </div>
      </form>
      {/* <Link className="text-blue-900 p-0 top-2 invisible md:visible" href="/signup" passHref>
        <pre>{`create\naccount`}</pre>
      </Link> */}
      {/* <div className="inline-block  invisible md:visible ">
          <form action={signInWithGoogle} className="md:h-[25px] md:w-[25px] h-0 w-0">
            <button>
              <FcGoogle size={"25"} className="w-0 h-0" />
            </button>
            </form>
          <form action={signInWithGoogle} className="md:h-[25px] md:w-[25px] h-0 w-0">
          <button>
              <SiNaver size={"20"} className="ml-[2px] w-0 h-0" />
              </button>
          </form>
          </div> */}
    </>
  );
}
