import { UserRole } from '@prisma/client'
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    provider?: string;
}

declare module "next-auth"{
    interface Session{
        user: ExtendedUser
    }
}