import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./lib/db";
import { LoginSchema } from "./schemas";
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from "bcryptjs";
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { UserRole } from '@prisma/client';
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

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
  pages: {
    signIn:'/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
    await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() }
              })
              }
            },
  callbacks: {
    async signIn({user, account}) {

      //Permitir OAuth login
      if(account?.provider !== 'credentials') return true;

      const userExist = await getUserById(user.id as string);

      if(!userExist?.emailVerified){
        return false
      }

      if (userExist.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(userExist.id);
        if (!twoFactorConfirmation) return false;
        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        });
      }
      
      return true
    },
    // Callback executado quando a sessão é criada ou acessada
    async session({token, session}) {
      // Verifica se existe um token.sub (ID do usuário) e, se existir, atribui a session.user.id
      if(token.sub){
        session.user.id = token.sub
      }
      
      // Verifica se existe token.role e session.user, e atribui o role do token à session.user.role
      if(token.role && session.user){
        session.user.role = token.role as UserRole
      }
      // Retorna a sessão modificada
        return session
    },
    // Callback executado quando um novo JWT é gerado ou acessado
    async jwt({token}) {
      // Verifica se existe token.sub (ID do usuário). Se não existir, retorna o token original
      if(!token.sub) return token;
      // Busca o usuário no banco de dados pelo ID contido em token.sub
      const userExist = await getUserById(token.sub);
      // Se o usuário não existir, retorna o token original
      if (!userExist) {
        return token
      };
      // Adiciona a role do usuário ao token
      token.role = userExist.role
      // Retorna o token modificado
      return token 
  },
             }, 
  session: { strategy: "jwt"},
} satisfies NextAuthConfig