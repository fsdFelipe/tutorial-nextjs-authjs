'use client'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'

const LoginSocial = () => {
  return (
    <div className='flex items-center w-full gap-x-2'>
        {/* Login com google*/}
        <Button size='lg'
            className='w-full hover:text-white hover:bg-slate-700 hover:border-2 hover:border-teal-400'
            variant='outline'
            onClick={() => { }}
        >
            <FcGoogle className='w-5 h-5' />
            <h1 className='font-bold -ml-1'>Google</h1>
        </Button>

        {/* Login com github*/}
        <Button size='lg'
            className='w-full hover:text-white hover:bg-slate-700 hover:border-2 hover:border-teal-400'
            variant='outline'
            onClick={() => { }}
        >
            <FaGithub className='w-5 h-5' />
            <h1 className='font-bold -ml-1'>Github</h1>
        </Button>
    </div>
    )
}

export default LoginSocial