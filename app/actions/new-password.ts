"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";

const ERROR_MESSAGES = {
  tokenNotFound: "Token não fornecido!",
  invalidFields: "Campos inválidos!",
  invalidToken: "Token inválido!",
  tokenExpired: "Token expirou!",
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {

  if (!token) {
    return { error: ERROR_MESSAGES.tokenNotFound };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: ERROR_MESSAGES.invalidToken };
  }

  const hasExpired = new Date(existingToken.expires).getTime() < Date.now();
  if (hasExpired) {
    return { error: ERROR_MESSAGES.tokenExpired };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.invalidFields };
  }

  const { password } = validatedFields.data;
  const existingUser = await getUserByEmail(existingToken.email);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { id: existingUser?.id },
      data: { password: hashedPassword },
    });
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
    
    return { success: "Senha alterada!" };
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return { error: "Ocorreu um erro ao redefinir a senha. Tente novamente." };
  }
};