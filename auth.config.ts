import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./lib/db";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export default {
  adapter: PrismaAdapter(db),
  providers: [
    Github,
    Google,
    CredentialsProvider({
      async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials);
          if( validatedFields.success){
            const { email, password} = validatedFields.data;
            const user = await getUserByEmail(email);
            if (!user || !user.password) return null;
            
            const passwordMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordMatch) return user;
          }
          return null;
      },
    })
  ],
  events: {
    async linkAccount({ user }) {
    await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() }
              })
              }
            },
  session: { strategy: "jwt"},
} satisfies NextAuthConfig