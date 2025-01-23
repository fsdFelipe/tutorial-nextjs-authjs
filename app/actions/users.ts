'use server';
import { db } from "@/lib/db";
import { AdminSettingsSchema } from "@/schemas";

export const getAllUsers = async () => {
  const users = await db.user.findMany();
  
  // Validação de cada usuário
  const validatedUsers = users.map((user) => AdminSettingsSchema.safeParse(user));
  // Verifica se há erros na validação
  validatedUsers.forEach((result, index) => {
    if (!result.success) {
      console.error(`Erro ao validar o usuário no índice ${index}:`, result.error.errors);
      throw new Error("Erro ao validar os dados dos usuários.");
    }
  });
  // Retorna os dados validados
  return validatedUsers.map((result) => result.data!); // `data` está garantido após a verificação de `success`
};