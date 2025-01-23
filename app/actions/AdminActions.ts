'use server'
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { AdminSettingsSchema } from "@/schemas";
import { z } from "zod";

export const adminUpdateUser = async (userId: string, values: z.infer<typeof AdminSettingsSchema>) => {
  const targetUser = await getUserById(userId);
  
  if (!targetUser) {
    return { error: "Usuário não encontrado" };
  }

  // Remova o campo `id` de values
  const { id, ...updateData } = values;
  // Atualize o usuário no banco de dados
  const updatedUser = await db.user.update({
    where: { id: targetUser.id },
    data: {
      ...updateData,
    },
  });

  return { success: "Usuário atualizado com sucesso!", user: updatedUser };
};