import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, token: string) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const confirmLink = `${domain}/auth/emailverification?token=${token}`;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou qualquer provedor
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail
      pass: process.env.EMAIL_PASSWORD, // Senha do app 
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmar email',
    html: `<p>Clique <a href="${confirmLink}">aqui</a> para confirmar seu e-mail.</p>`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado para:', email);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro provedor
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail
      pass: process.env.EMAIL_PASSWORD, // Senha do app ou do e-mail
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // E-mail do remetente
    to: email, // E-mail do destinatário
    subject: 'Reset senha',
    html: `<p>Clique <a href="${resetLink}">aqui</a> para cadastrar nova senha.</p>`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado para:', email);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro provedor
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail
      pass: process.env.EMAIL_PASSWORD, // Senha do app 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // E-mail do remetente
    to: email, // E-mail do destinatário
    subject: 'Codigo de autenticação',
    html: `<p>Seu código 2FA: ${token}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado para:', email);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
  
};