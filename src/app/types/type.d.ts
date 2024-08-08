import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      seq: bigint;
      id: string;
      nickname: string;
    };
  }
  interface Token {
    seq: bigint;
    id: string;
    nickname: string;
  }

  interface User {
    seq: bigint;
    id: string;
    nickname: string | null;
    role: string;
    created_at: Date;
  }
}
