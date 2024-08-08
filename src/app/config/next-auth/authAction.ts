"use server";
import { auth, signIn, signOut, update } from "@/app/config/next-auth/auth";

export const signInWithCredentials = async (formData: FormData) => {
  await signIn("credentials", {
    username: formData.get("username") || "",
    password: formData.get("password") || "",
  });
};
export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};
export { auth as getSession, update as updateSession };
