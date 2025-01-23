'use client'
import { getAllUsers } from '@/app/actions/users';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch';
import { AdminSettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserEdit } from 'react-icons/fa';
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

    const form = useForm<z.infer<typeof AdminSettingsSchema>>({
      resolver: zodResolver(AdminSettingsSchema)
    })
    const getImageUrl = (user: z.infer<typeof AdminSettingsSchema>) => user.image || '/images/sem foto.gif';

  return (
    <div className='w-full flex justify-center items-center'>
    <Card className='lg:w-1/2 w-full'>
        <CardHeader className='text-center'>
            <h1 className='font-bold text-xl'>Usuarios</h1>
        </CardHeader>
        <CardContent className='w-full'>
        <div className="w-full grid grid-cols-4 bg-zinc-700 items-center text-white"
            style={{ gridTemplateColumns: '0.7fr 1.2fr 0.7fr 0.5fr' }} >
        <p className='font-bold border px-4 p-2'>Nome</p>
        <p className='font-bold border px-4 p-2'>Email</p>
        <p className='font-bold border px-4 p-2'>Role</p>
        <p className='font-bold border px-4 p-2'>2FA</p>
      </div>
      {users.map((user) => (
            <div key={user.id} 
            className="relative w-full grid grid-cols-4 border py-1 hover:bg-slate-200 hover:border-red-400 items-center"
            style={{ gridTemplateColumns: '0.7fr 1.2fr 0.7fr 0.5fr' }}
            > 
              <div className="w-full flex items-center gap-1">
                <Image
                  src={getImageUrl(user)}
                  width={34}
                  height={36}
                  alt="img"
                  className="rounded-lg border"
                />
                <p>{user.name}</p>
              </div>
              <p className='pl-2 py-2 border-r'>{user.email}</p>
              <p className='pl-2 py-2 border-r'>{user.role}</p>
              <p className="p-2 flex items-center justify-between">
                {user.isTwoFactorEnabled ? 'Ativado' : 'Desativado'}
                <Switch checked={user.isTwoFactorEnabled} disabled />
              </p>
              <div className='w-full h-9 opacity-0 hover:opacity-100 absolute left-1/2 transform -translate-x-1/2'>
                <div className='flex w-full h-full items-center justify-center'>
                  <div className='w-full h-full relative bg-teal-300 opacity-20 '/>
                  <Button className='z-20 absolute'>
                    <FaUserEdit />Editar Usuário
                  </Button>
                </div>
              </div>
            </div>
          ))}
    </CardContent>
    </Card>
</div>
  )
}

export default DashboardPage