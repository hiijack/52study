import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl} }) {
      if (nextUrl.pathname.startsWith('/api')) {
        if (!auth) {
          return Response.json({ code: -1, message: 'Not authenticated' }, { status: 401 });
        }
        return true;
      }
      return !!auth;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
