"use client";
import { signInWithCredentials, signOutWithForm } from "@/app/config/next-auth/authAction";
import { Session } from "next-auth";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <span className="">{`${session.user.id} (${session.user.nickname})`}</span>
        <div className="w-full text-center">
          <button className="bg-blue-200 text-blue-800 justify-center rounded-md w-fit pr-1 pl-1">
            로그아웃
          </button>
        </div>
      </form>
    );
  }

  return (
    <span className="absolute right-2 grid grid-cols-[214px,40px] w-52 overflow-hiddene">
      <form
        className="grid grid-cols-[144px,50px]"
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
        <div className="w-[40px]">
          <button className="h-[50px] bg-slate-200 rounded-r-md p-2 text-slate-600 hover:bg-slate-300 active:bg-slate-400">
            Login
          </button>
        </div>
      </form>
    </span>
  );
}
