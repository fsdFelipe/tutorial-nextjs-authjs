import { Card, CardHeader, CardContent } from '@/components/ui/card'
import React from 'react'

const page = () => {
  
  return (
    <div className='w-full flex justify-center items-center'>
    <Card className='w-1/2'>
        <CardHeader className='text-center'>
            <h1 className='font-bold text-xl'>Usuarios</h1>
        </CardHeader>
        <CardContent className='w-full'>
        <div className='grid grid-cols-4 text-center bg-slate-400'>
        <p className='font-bold border px-4 p-2'>Nome</p>
        <p className='font-bold border px-4 p-2'>Email</p>
        <p className='font-bold border px-4 p-2'>Role</p>
        <p className='font-bold border px-4 p-2'>2FA</p>
      </div>
    </CardContent>
    </Card>
</div>
  )
}
export default page