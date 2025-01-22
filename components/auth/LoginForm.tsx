'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from '../CardWrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import FormSuccess from './FormSuccess'
import FormError from './FormError'
import { login } from '@/app/actions/login'
import Link from 'next/link'

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  //Inicializa o useForm com o schema de validação definido em LoginSchema
  const form = useForm<z.infer<typeof LoginSchema>>({
    // usando zodResolver para integrar a validação com Zod.
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: '',
        password: ''
    }    
})
 //onSubmit inicial
 const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
    login(values)
        .then((data) => {
            setError(data.error)
            setSuccess(data.success)
        })
    })
}

  return (
    <CardWrapper 
      headerLabel="Bem vindo!"
      footerLabel="Ainda não tem uma conta?"
      buttonHref="/auth/register"
      showSocialLogin
      className='w-[400px] shadow-xl'
      >
        <Form {...form}>
          <form
            className='space-y-6'
            onSubmit={form.handleSubmit(onSubmit)}
            >
            <div className='space-y-4'>
                {/*campo email*/}
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder='exemplo@email.com'
                                    type='email'
                                    />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    {/*campo senha*/}
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    type='password'
                                />
                                </FormControl>
                                <Button size='sm' variant='link' asChild className='px-0 font-normal'>
                                    <Link href='/auth/reset'>Esqueceu a senha?</Link>
                                </Button>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            {/*Botão login*/}
            <Button type='submit' className='w-full'>
               <span>Login</span>
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm