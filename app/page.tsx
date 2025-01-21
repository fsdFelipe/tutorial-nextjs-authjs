import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-extrabold text-center">
        Home Page
        <p className="text-md font-normal text-gray-200">Bem vindo !</p>
      </h1>
      <LoginButton>
        <Button variant='secondary'>Sign In</Button>
      </LoginButton>
    </div>
  );
}
