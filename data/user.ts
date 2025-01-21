import { db } from "@/lib/db"

//buscar o email do usuario no banco de dados
export const getUserByEmail = async (email : string) =>{
    try {
      const user = await db.user.findUnique({ where: {email}}) 
      return user 
    } catch{
        return null
    }
}