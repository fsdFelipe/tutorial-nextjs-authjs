'use server'
import { signIn } from "@/auth"
import { getAccountByUserId } from "@/data/accounts"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/nodeMailer"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z  from "zod"

export const login = async (values : z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values)
    
    if(!validatedFields.success){
        return { error: "Dados inválidos"}
    }

    const { email, password, code} = validatedFields.data;

    const userExist = await getUserByEmail(email);

    if(userExist && userExist.email && !userExist.password){
        const provider = await getAccountByUserId(userExist.id)
        return { error: `Senha não cadastrada logue com ${provider?.provider}`}
    }

    if(!userExist || !userExist.password){
        return { error: "Email não cadastrado"}
    }
    
    if(userExist.email && !userExist.emailVerified){
        const verificationToken = await generateVerificationToken(userExist.email);
        
        //enviando email
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { error: 'Email não verificado ! verifique seu email'}
    }

    if(userExist.isTwoFactorEnabled && userExist.email && userExist.password){
        if(code){
            const twoFactorToken = await getTwoFactorTokenByEmail(userExist.email)
            if(!twoFactorToken){
                return { error: "Codigo Inválido"}
            }
            if(twoFactorToken.token !== code){
                return { error: 'Codigo inválido'}
            }
             const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) {
                return { error: "Código expirado!" };
            }
            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });
            const existingConfirmation = await getTwoFactorConfirmationByUserId(userExist.id);
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                where: { id: existingConfirmation.id }
                });
            }
            await db.twoFactorConfirmation.create({
                data: {
                userId: userExist.id,
            }
            });
        }else{
        const twoFactorToken = await generateTwoFactorToken(userExist.email)
        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
        )
        return {twoFactor: true}
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
       if(error instanceof AuthError){
        switch (error.type) {
            case 'CredentialsSignin':
                return { error: "Credenciais inválidas"}
                default:
                    return { error: "Erro desconhecido"}
       } 
    }
    throw error
    }

    return { success: 'Bem vindo!'}
}