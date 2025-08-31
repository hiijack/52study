import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { generateAccessToken, refreshAccessToken } from '@/app/lib/service';
import { authConfig } from '@/auth.config';
import { getUser } from './app/lib/data';

// auth.ts，middleware.ts要与/app同级才能生效
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    // 在每次获取session时都会依次执行jwt callback、session callback
    async jwt({ token, user }) {
      if (user) {
        // 初次登录才会返回user
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 900000; // 15m
      }
      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token;
      }
      console.log('refresh');
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken; // todo
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname.startsWith('/api')) {
        if (!auth) {
          return Response.json({ code: -1, message: 'Not authenticated' }, { status: 401 });
        }
        return true;
      }
      return !!auth;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email"
        },
        password: {
          type: 'password'
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) {
            // throw new Error("Invalid credentials.");
            return null;
          }
          const matched = bcrypt.compare(password, user.password);
          if (matched) {
            const tokens = await generateAccessToken(user.id);
            return { ...user, ...tokens };
          }
        }

        return null;
      },
    }),
  ],
});
