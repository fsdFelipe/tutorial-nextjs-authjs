'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from '../CardWrapper'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import FormError from './FormError'
import FormSuccess from './FormSuccess'
import { Input } from '../ui/input'
import { register } from '@/app/actions/register'

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

   // Inicializa o hook useForm com o schema de validação RegisterSchema
   const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
        email: "",
        password: "",
        name: ""
    },
})

//onSubmit chama a função do arquivo regisrer q registra o novo usuario
const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
    setError("")
    setSuccess("")
    startTransition(() => {
        register(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
    })
}


  return (
    <CardWrapper
        headerLabel='Criar uma conta'
        footerLabel='Já possui uma conta?'
        buttonHref='/auth/login'
        showSocialLogin
        className='w-[400px] shadow-xl' 
        >
           {/*Inicio do formulario*/}
          <Form {...form}>
            <form 
              className='space-y-6'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='space-y-4'>
                {/*Campo nome*/}
                <FormField 
                control={form.control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                disabled={isPending}
                                placeholder='Nome'
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                {/*Campo email*/}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder='john.doe@example.com'
                                    type='email'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*Campo password*/}
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
              </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button type='submit' disabled={isPending} className='w-full'>
                    <span>Enviar</span>
                </Button>
            </form>
          </Form>
    </CardWrapper>
  )
}

export default RegisterForm