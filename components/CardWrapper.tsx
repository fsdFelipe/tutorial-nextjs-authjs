import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    footerLabel: string;
    buttonHref: string;
    showSocialLogin?: boolean;
    className?: string;
}
const CardWrapper = ({ 
    children, headerLabel, footerLabel, buttonHref, showSocialLogin, className 
} : CardWrapperProps) => {
    
  return (
    <Card className={className}>
        <CardHeader>
            {headerLabel}
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
            {footerLabel}
        </CardFooter>
    </Card>
  )
}

export default CardWrapper