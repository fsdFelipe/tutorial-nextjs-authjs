import { db } from '@/lib/db'

export const getVerificationTokenByEmail = async ( email: string) => {
   try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    });
    return verificationToken;
   } catch (error) {
    console.error("Erro ao buscar token no banco de dados:",error)
    return null
   }
}

export const getVerificationTokenByToken = async ( token: string) => {
   try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { token }
    });
    return verificationToken;
   } catch (error) {
    console.error("Erro ao buscar token no banco de dados:",error)
    return null
   }
}