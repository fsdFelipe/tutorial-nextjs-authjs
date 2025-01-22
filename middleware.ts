import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { apiAuthPrefix, publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req; // Obtem a URL da requisição
    const isLoggedIn = !!req.auth; // Verifica se o usuário está autenticado (req.auth indica a presença de autenticação)
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // Verifica se a rota é uma rota de autenticação de API
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // Verifica se a rota está na lista de rotas públicas
    const isAuthRoute = authRoutes.includes(nextUrl.pathname); // Verifica se a rota está na lista de rotas de autenticação

    // Não faz nenhuma ação adicional para rotas de autenticação de API
    if (isApiAuthRoute) {
    return
    }

    // Se for uma rota de autenticação e o usuário estiver logado, redireciona para a rota padrão de login
    if (isAuthRoute){
      if (isLoggedIn){
        return  Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      };
      return // Permite o acesso à página de autenticação se o usuário não estiver logado
    }
    
    // Se o usuário não estiver logado e a rota não for pública, redireciona para a página de login
    if (!isLoggedIn && !isPublicRoute){
      return Response.redirect(new URL('/auth/login', nextUrl))
    }

  return
})

// Configuração para aplicar o middleware apenas em determinadas rotas
export const config = {
 matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}