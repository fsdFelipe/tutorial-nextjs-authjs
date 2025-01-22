import { auth } from "@/auth";
import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-extrabold text-center">
        Home Page
        <p className="text-md font-normal text-gray-200">Bem vindo !</p>
      </h1>
      {session?.user ? (
         <p>Olá, bem vindo <span className="font-bold text-red-400">{session.user.name}</span></p>
      ) : (
      <LoginButton>
        <Button variant='secondary'>Sign In</Button>
      </LoginButton>
      )}
    </div>
  );
}
