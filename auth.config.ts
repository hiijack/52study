import { JWT } from 'next-auth/jwt';
import type { NextAuthConfig } from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    accessToken: string;
    refreshToken: string; // todo
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

// https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
} satisfies NextAuthConfig;
