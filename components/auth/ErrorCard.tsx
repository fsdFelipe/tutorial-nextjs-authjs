import { FaExclamationTriangle } from "react-icons/fa";
import CardWrapper from "../CardWrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! algo deu errado!"
            buttonHref="/auth/login"
            footerLabel="Voltar para login"
        >
            <div className="w-full flex justify-center items-center">
                <FaExclamationTriangle className="text-destructive" />
            </div>
        </CardWrapper>
    );
};