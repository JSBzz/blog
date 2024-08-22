"use server";
import { auth, signIn, signOut, update } from "@/app/config/next-auth/auth";

export const signInWithCredentials = async (formData: FormData) => {
  try {
    if (formData.get("username") && formData.get("password")) {
      await signIn("credentials", {
        redirect: false,
        username: formData.get("username") || "",
        password: formData.get("password") || "",
      });
    }
    return { status: true };
  } catch (err) {
    console.log("err: ", err);
    if (err?.message == "CREDENTIAL_ERROR") {
      return {
        status: false,
        message: "계정이 존재하지 않거나 아이디 또는 비밀번호가 일치하지 않습니다.",
      };
    } else {
      return { status: false, message: "로그인 중 에러가 발생했습니다." };
    }
  }
};
export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};

export const signInWithGoogle = async () => {
  await signIn("google", {});
};
export { auth as getSession, update as updateSession };
