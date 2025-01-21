import React from 'react'
import CardWrapper from '../CardWrapper'

const RegisterForm = () => {

  return (
    <CardWrapper
        headerLabel='Criar uma conta'
        footerLabel='Já possui uma conta?'
        buttonHref='/auth/login'
        showSocialLogin >
          Formulario de registro
    </CardWrapper>
  )
}

export default RegisterForm