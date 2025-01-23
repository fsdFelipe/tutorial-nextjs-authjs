"use client";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormError from "./FormError";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
};

export const RoleGate = ({ children, allowedRole,}: RoleGateProps) => {
    const role = useCurrentRole();
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => { if (role !== allowedRole) {
        setShowMessage(true);
        const timeout = setTimeout(() => {
            router.push("/"); // Redireciona após 5 segundos
        }, 5000);
        return () => clearTimeout(timeout); // Limpa o timeout ao desmontar o componente
        } 
    }, [role, allowedRole, router]);
    
    if (role !== allowedRole) {
        return (
            <div className="flex items-center justify-center rounded-lg bg-zinc-800">
                {showMessage && (
                    <FormError message="Você não tem permissão para acessar esta página. Redirecionando..." />
                )}
            </div>
        );
    }
    return (
        <>
            {children}
        </>
    );
};