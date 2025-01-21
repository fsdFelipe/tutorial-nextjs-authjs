import React from 'react'
import CardWrapper from '../CardWrapper'

const LoginForm = () => {

  return (
    <CardWrapper 
      headerLabel="Bem vindo!"
      footerLabel="Ainda não tem uma conta?"
      buttonHref="/auth/register"
      showSocialLogin
      className='w-[400px] shadow-xl'
      >
        Login Form
    </CardWrapper>
  )
}

export default LoginForm