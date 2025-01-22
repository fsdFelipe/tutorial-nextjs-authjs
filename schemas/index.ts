import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Insira um email válido"
    }),
    password: z.string().min(1, {
        message: "A senha é obrigatória"
    }),
    code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: 'Nome é obrigatório'
    }),
    email: z.string().email({
        message: "Insira um email válido"
    }),
    password: z.string().min(6, { 
        message: "A senha deve ter pelo menos 6 caracteres" 
    }),
     /* 
     //Codigo para definir regra para o usuario criar uma senha forte
      password: z.string().min(8, { 
        message: "A senha deve ter pelo menos 8 caracteres" 
    }).refine((value) => /[A-Z]/.test(value), { 
        message: "A senha deve ter pelo menos uma letra maiúscula" 
    }).refine((value) => /[a-z]/.test(value), { 
        message: "A senha deve ter pelo menos uma letra minúscula" 
    })
    .refine((value) => /[0-9]/.test(value), {
        message: "A senha deve ter pelo menos um número"
    }).refine((value) => /[!@#$%^&*]/.test(value), {
        message: "A senha deve ter pelo menos um caractere especial"
    }), */
})

export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email é obrigatório",
    }),
  });

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimo de 6 caracteres",
  }),
  /* Codigo para definir regra para o usuario criar uma senha forte
    password: z.string().min(8, { 
      message: "A senha deve ter pelo menos 8 caracteres" 
  }).refine((value) => /[A-Z]/.test(value), { 
      message: "A senha deve ter pelo menos uma letra maiúscula" 
  }).refine((value) => /[a-z]/.test(value), { 
      message: "A senha deve ter pelo menos uma letra minúscula" 
  })
  .refine((value) => /[0-9]/.test(value), {
      message: "A senha deve ter pelo menos um número"
  }).refine((value) => /[!@#$%^&*]/.test(value), {
      message: "A senha deve ter pelo menos um caractere especial"
  }), */
});