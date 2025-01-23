import { useSession } from "next-auth/react";

export const useCurrentProvider = () => {
  const session = useSession();
  return session?.data?.user?.provider;
};