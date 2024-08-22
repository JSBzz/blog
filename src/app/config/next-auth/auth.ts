import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import prisma from "../prisma/db";

const client = prisma;

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          let user = await client.user.findUnique({
            where: { id: credentials.username! as string },
          });
          if (user) {
            const isCompare = await compare(credentials.password as string, user?.pwd!);
            const { pwd, ...userInfo } = user;
            if (isCompare) return { ...userInfo, provider: "credential" };
          }
        }
        throw new Error("CREDENTIAL_ERROR");
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.provider = user?.provider;
        token.id = user.id;
        token.seq = user.seq;
        token.role = user.role;
        token.nickname = user.nickname;
        token.user = user?.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.provider = token.provider as string;
      session.user.id = token.id as string;
      session.user.nickname = token.nickname as string;
      session.user.seq = token.seq as number;
      session.user.role = token.role as string;
      session.user.email = token.email as string;
      return session;
    },
  },
});
