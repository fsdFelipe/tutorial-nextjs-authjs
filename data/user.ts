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

//buscar o usuario no banco de dados pelo id
export const getUserById = async (id : string) =>{
  try {
    const user = await db.user.findUnique({ where: {id}}) 
    return user 
  } catch{
      return null
  }
}