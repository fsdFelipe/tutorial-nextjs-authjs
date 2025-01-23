'use client'
import { getAllUsers } from '@/app/actions/users';
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { AdminSettingsSchema } from '@/schemas';
import React, { useEffect, useState } from 'react'
import { z } from 'zod';

const DashboardPage = () => {
  const [users, setUsers] = useState<z.infer<typeof AdminSettingsSchema>[]>([]);
  
  useEffect(() => {
      const fetchUsers = async () => {
        const allUsers = await getAllUsers(); 
        setUsers(allUsers);
      };
      fetchUsers();
    }, []);

  return (
    <div className='w-full flex justify-center items-center'>
    <Card className='lg:w-1/2 w-full'>
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
      {users.map((user) => (
            <div key={user.id} className='w-full grid grid-cols-4 border py-1'> 
              <p className='pl-2 py-2 border-r'>{user.name}</p>
              <p className='pl-2 py-2 border-r'>{user.email}</p>
              <p className='pl-2 py-2 border-r'>{user.role}</p>
              <p className='pl-2 py-2'>{user.isTwoFactorEnabled ? 'Ativado' : 'Desativado'}</p> 
            </div>
          ))}
    </CardContent>
    </Card>
</div>
  )
}

export default DashboardPage