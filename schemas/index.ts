import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Insira um email válido"
    }),
    password: z.string().min(1, {
        message: "A senha é obrigatória"
    })
})