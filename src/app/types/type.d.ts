import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      seq: number;
      id: string;
      nickname: string;
      role: string;
    };
  }
  interface Token {
    seq: number;
    id: string;
    nickname: string;
  }

  interface User {
    seq: number;
    id: string;
    nickname: string | null;
    role: string;
    created_at: Date;
  }
}
