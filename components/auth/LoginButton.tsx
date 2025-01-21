'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

interface LoginButtonProps {
    children: React.ReactNode;
}

const LoginButton = ({children} : LoginButtonProps) => {
    const router = useRouter();
  return (
    <div onClick={() => router.push('/auth/login')}>
        {children}
    </div>
  )
}
export default LoginButton