import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      provider: string;
      seq: number;
      id: string;
      nickname: string;
      role: string;
      email: string;
    };
  }
  interface Token {
    provider: string;
    seq: number;
    id: string;
    nickname: string;
  }

  interface User {
    seq: number;
    provider: string;
    id: string;
    nickname: string | null;
    role: string;
    created_at: Date;
  }
}
