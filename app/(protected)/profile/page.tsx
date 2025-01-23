'use client'
import FormError from '@/components/auth/FormError';
import FormSuccess from '@/components/auth/FormSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useCurrentProvider } from '@/hooks/use-current-provider';
import { useCurrentUser } from '@/hooks/use-current-user';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const PerfilPage = () => {
  const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const provider = useCurrentProvider()
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            image: user?.image || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    });
    const imageUrl = user?.image || '/images/sem foto.gif';

  return (
    <div className="flex w-full h-full flex-col items-center justify-center bg-gradient-to-b from-teal-500 to-zinc-800">
      <Card className="w-[600px] relative">
        <CardHeader className='flex flex-row gap-3 items-center justify-center'>
            <Image src={imageUrl} width={45} height={45} alt='Foto' className='border rounded-lg' />
            <p className="text-2xl font-semibold text-center">
                Perfil
            </p>
            <Button variant='ghost' className='absolute right-2 top-2'
                disabled={isPending}
                >
                <Link href='/' className='flex items-center gap-1'><MdOutlineArrowBackIosNew />Voltar</Link>
            </Button>
        </CardHeader>
        <CardContent> 
            {provider && provider !== 'credentials' && ( 
                <div className="flex flex-row items-center justify-center rounded-lg border p-3 gap-5 shadow-sm"> 
                <p className="text-sm font-medium">Logado com conta:</p> 
                <p className="text-sm font-bold">{provider}</p> 
                </div> 
            )} 
        </CardContent>
        <CardContent>
            <Form {...form}>
                <form className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="John Doe"
                                            disabled={isPending}
                                        />
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
                                        <Input
                                            {...field}
                                            placeholder="John Doe"
                                            disabled
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {user?.isOAuth === false && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="******"
                                                    type="password"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="******"
                                                    type="password"
                                                    disabled={isPending}
                                                />
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
                            </>
                        )}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        {...field}
                                        disabled
                                    />
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </form>
            </Form>
        </CardContent>
            <CardFooter>
                <div className="w-full flex flex-row items-center justify-between">
                <Button
                    disabled={isPending}
                    type="submit"
                    >
                    Salvar
                </Button>
                </div>
            </CardFooter>
      </Card>
    </div>
  )
}

export default PerfilPage