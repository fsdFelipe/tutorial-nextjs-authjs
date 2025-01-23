'use server';
import { unstable_update } from "@/auth";
import { UserRole } from "@prisma/client"

export const updateUserSession = async (updatedUser: {
  name: string;
  email: string;
  isTwoFactorEnabled: boolean;
  role: UserRole;
}) => {
  await unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role
    },
  });
};