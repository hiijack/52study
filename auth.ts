import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { authConfig } from '@/auth.config';
import { getUser } from "./app/lib/data";
 
// auth.ts，middleware.ts要与/app同级才能生效
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password }: any = credentials;
        const user = await getUser(email);
        if (!user) {
          // throw new Error("Invalid credentials.");
          return null;
        }
        const matched = bcrypt.compare(password, user.password);
        if (matched) {
          return user;
        }
        return null;
      }
    }),
  ],
})