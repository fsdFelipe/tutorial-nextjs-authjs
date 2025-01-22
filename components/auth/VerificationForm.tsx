"use client";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import CardWrapper from "../CardWrapper";

export const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError("Missing token!");
            return;
        }
    }, [token, success, error]);
    
    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    
    return (
        <CardWrapper
            headerLabel="Verificando email"
            footerLabel="Back to login"
            buttonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                {success ? <FormSuccess message={success} /> : (<FormError message={error} />)
                }
            </div>
        </CardWrapper>
    )
}