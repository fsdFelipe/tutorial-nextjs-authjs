'use server'
import { RegisterSchema } from "@/schemas"
import * as z  from "zod"
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/nodeMailer"

// Função para registrar um novo usuário
export const register = async (values : z.infer<typeof RegisterSchema>) =>{

    // Valida os campos enviados com base no esquema definido
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return { error: "Dados inválidos"}
    }
    
    const {email, password, name} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    //Verficar se email ja foi cadastrado
    const userExist = await getUserByEmail(email)

    //se o email ja foi cadastrado exibir:
    if(userExist) {
        return {error : 'Email ja cadastrado'}
    }

    // Tentar criar um novo usuário no banco de dados
    try {
      await db.user.create({
        data: {
          name, 
          email, 
          password: hashedPassword, 
        },
      });

      //gerando o token apos o usaurio se cadastrar
      const verificationToken = await generateVerificationToken(email)
      
      //enviando email
      await sendVerificationEmail(verificationToken.email, verificationToken.token)
  
      // Retorna sucesso se o cadastro for realizado
      return { success: "Cadastro realizado com sucesso" };
    } catch (error) {
      // Captura erros ao criar o usuário no banco
      console.error("Erro ao criar usuário:", error);
      return { error: "Erro ao cadastrar usuário" };
    }
}