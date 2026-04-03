import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      setupCompleted: boolean;
    };
  }

  interface User {
    setupCompleted?: boolean;
    profile?: {
      setupCompleted: boolean;
    } | null;
  }
}
