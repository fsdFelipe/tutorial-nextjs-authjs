'use server'
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/nodeMailer";
import { currentUser } from "@/lib/auth";
import { updateUserSession } from "@/lib/updateUserSession";

const messages = {
    unauthorized: "Não autorizado",
    emailExists: "Email já cadastrado!",
    verificationEmailSent: "Email de verificação enviado",
    incorrectPassword: "Senha incorreta!",
    updated: "Dados atualizados!",
  };

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  
  if (!user) {
    return { error: messages.unauthorized };
  }

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: messages.unauthorized };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: messages.emailExists };
    }
    const verificationToken = await generateVerificationToken(
      values.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { success: messages.verificationEmailSent };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );
    if (!passwordsMatch) {
      return { error: messages.incorrectPassword };
    }
    const hashedPassword = await bcrypt.hash(
      values.newPassword,
      10,
    );
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  
  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    }
  });

   // Atualiza a sessão do usuário
   await updateUserSession({
    name: updatedUser.name || '',
    email: updatedUser.email || '',
    isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    role: updatedUser.role,
  });
  
  return { success: messages.updated };
}