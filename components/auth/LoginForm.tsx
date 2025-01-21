'use client'
import React, { useState } from 'react'
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

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
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
    //exibindo os valores fornecidos pelo usuario no console do browser
    console.log(values)
    // Simulando uma resposta de sucesso ou erro
    if (values.email === 'test@example.com' && values.password === '1234') {
      setSuccess('Login realizado com sucesso!');
      setError(undefined);  // Limpa a mensagem de erro caso o login seja bem-sucedido
    } else {
      setError('Credenciais inválidas, tente novamente.');
      setSuccess(undefined);  // Limpa a mensagem de sucesso em caso de erro
    }
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
                                    type='password'
                                />
                                </FormControl>
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