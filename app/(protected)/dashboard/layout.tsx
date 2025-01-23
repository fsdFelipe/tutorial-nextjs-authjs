import { RoleGate } from "@/components/auth/RoleGate";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <RoleGate allowedRole="ADMIN">
      <main className="w-full min-h-screen h-screen bg-gradient-to-b from-cyan-200 to-zinc-800 flex flex-col items-center justify-center">
        {children}
      </main>
      </RoleGate>
  );
}