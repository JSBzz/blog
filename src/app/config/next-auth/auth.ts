import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const client = new PrismaClient();

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
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
            if (isCompare) return userInfo;
          }
        }
        return null;
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
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.seq = user.seq;
        token.nickname = user.nickname;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.nickname = token.nickname as string;
      session.user.seq = token.seq as bigint;
      return session;
    },
  },
});
