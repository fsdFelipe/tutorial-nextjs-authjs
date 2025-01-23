import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  
  return (
    <SessionProvider session={session}>
      <main className="w-full min-h-screen h-screen bg-gradient-to-b from-cyan-200 to-zinc-800 flex flex-col items-center justify-center">
        {children}
      </main>
      </SessionProvider>
  );
}