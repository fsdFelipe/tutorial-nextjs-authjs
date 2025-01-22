import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
export const { handlers: {GET, POST} } = NextAuth(authConfig);