import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import LoginSocial from './auth/LoginSocial';
import Link from 'next/link';
import { Button } from './ui/button';

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
        <CardHeader className='w-full flex flex-col gap-y-4 items-center justify-center'>
            <p className='text-base font-semibold'>{headerLabel}</p>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocialLogin && (
            <CardFooter>
                <LoginSocial />
            </CardFooter>
        )}
        <CardFooter className='w-full flex items-center justify-center' >
            <Button variant='link' className='text-xs'>
                <Link href={buttonHref}>{footerLabel}</Link>
            </Button>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper