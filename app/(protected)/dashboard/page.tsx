'use client'
import { adminUpdateUser } from '@/app/actions/AdminActions';
import { getAllUsers } from '@/app/actions/users';
import FormError from '@/components/auth/FormError';
import FormSuccess from '@/components/auth/FormSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AdminSettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { FaSave, FaUserEdit, FaWindowClose } from 'react-icons/fa';
import { z } from 'zod';

const DashboardPage = () => {
  const [users, setUsers] = useState<z.infer<typeof AdminSettingsSchema>[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [editSuccessMessage, setEditSuccessMessage] = useState<string | null>(null);
  
  useEffect(() => {
      const fetchUsers = async () => {
        const allUsers = await getAllUsers(); 
        setUsers(allUsers);
      };
      fetchUsers();

      if (editSuccessMessage) {
        const timeout = setTimeout(() => {
          setEditSuccessMessage(null);
        }, 15000);
        return () => clearTimeout(timeout);
      }
    }, [editSuccessMessage]);

    const form = useForm<z.infer<typeof AdminSettingsSchema>>({
      resolver: zodResolver(AdminSettingsSchema)
    })

    const handleUserClick = (user : z.infer<typeof AdminSettingsSchema>) => {
      setEditingUserId(user.id)
      console.log(user)
      form.reset(user)
    };

    const onSubmit = (values: z.infer<typeof AdminSettingsSchema>) => {
      // Atualiza os dados do usuário alterado no estado
      setUsers((prev) =>
        prev.map((user) => (user.id === editingUserId ? { ...user, ...values } : user))
      );
      if (editingUserId) {
        startTransition(() => {
          console.log('dados enviados para backend id update:' + editingUserId, 'dados:' + JSON.stringify(values))
          adminUpdateUser(editingUserId, values)
              .then((data) => {
                  if (data?.error) {
                      setError(data.error);
                  }
                  if (data.success) {
                      setSuccess(data.success);
                  }
              })
              .catch(() => setError("Something went wrong!"));
      });  
      }
      setEditSuccessMessage(`Usuário ${values.name} foi editado com sucesso!`);
      setEditingUserId(null); // Sai do modo de edição
    };

    const getImageUrl = (user: z.infer<typeof AdminSettingsSchema>) => user.image || '/images/sem foto.gif';

  return (
    <div className='w-full flex flex-col justify-center items-center'>
    {editingUserId ? (
      // Renderiza apenas o formulário de edição quando editingUserId não é null
      <Form {...form}>
        <form className="mt-4 w-[400px]" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='w-full'>
            <CardHeader className='text-center'>
              <h1 className='font-bold text-xl'>Editar Usuário</h1>
            </CardHeader>
            <CardContent className='w-full'>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="w-full flex justify-center items-center gap-2">
                  <Button variant="outline" className='w-full'>
                    <FaSave /> Salvar Usuário
                  </Button>
                  <Button variant="outline" className='w-full' onClick={() => setEditingUserId(null)}>
                    <FaWindowClose />Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    ) : (
      <Card className='lg:w-1/2 w-full'>
      <CardHeader className='text-center'>
        <h1 className='font-bold text-xl'>Usuários</h1>
          {/* Mensagem de sucesso */}
        {editSuccessMessage && (
            <FormSuccess   message={editSuccessMessage} />
        )}
      </CardHeader>
      <CardContent className='w-full'>
        <div
          className="w-full grid grid-cols-4 bg-zinc-700 items-center text-white"
          style={{ gridTemplateColumns: '0.7fr 1.2fr 0.7fr 0.5fr' }}
        >
          <p className='font-bold border px-4 p-2'>Nome</p>
          <p className='font-bold border px-4 p-2'>Email</p>
          <p className='font-bold border px-4 p-2'>Role</p>
          <p className='font-bold border px-4 p-2'>2FA</p>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
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
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p className="p-2 flex items-center justify-between">
              {user.isTwoFactorEnabled ? 'Ativado' : 'Desativado'}
              <Switch checked={user.isTwoFactorEnabled} disabled />
            </p>
            <div className='w-full h-9 opacity-0 hover:opacity-100 absolute left-1/2 transform -translate-x-1/2'>
              <div className='flex w-full h-full items-center justify-center'>
                <div className='w-full h-full relative bg-teal-300 opacity-20 '/>
                <Button className='z-20 absolute' onClick={() => handleUserClick(user)}>
                  <FaUserEdit />Editar Usuário
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
    )}
  </div>
  )
}

export default DashboardPage