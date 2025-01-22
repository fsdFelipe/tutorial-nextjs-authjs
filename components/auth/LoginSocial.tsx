'use client'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const LoginSocial = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    
    const onClick = (providers: "google" | "github") => {
        signIn(providers, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    }

  return (
    <div className='flex items-center w-full gap-x-2'>
        {/* Login com google*/}
        <Button size='lg'
            className='w-full hover:text-white hover:bg-slate-700 hover:border-2 hover:border-teal-400'
            variant='outline'
            onClick={() => onClick('google')}
        >
            <FcGoogle className='w-5 h-5' />
            <h1 className='font-bold -ml-1'>Google</h1>
        </Button>

        {/* Login com github*/}
        <Button size='lg'
            className='w-full hover:text-white hover:bg-slate-700 hover:border-2 hover:border-teal-400'
            variant='outline'
            onClick={() => onClick('github')}
        >
            <FaGithub className='w-5 h-5' />
            <h1 className='font-bold -ml-1'>Github</h1>
        </Button>
    </div>
    )
}

export default LoginSocial