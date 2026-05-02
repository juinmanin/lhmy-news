import * as nodemailer from 'nodemailer';
import { getEnv } from './env.mjs';

interface MailOptions {
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendAdminEmail({ subject, text, replyTo }: MailOptions) {
  const host = getEnv('SMTP_HOST');
  const port = Number(getEnv('SMTP_PORT') || 587);
  const user = getEnv('SMTP_USER');
  const pass = getEnv('SMTP_PASS');
  const from = getEnv('SMTP_FROM') || user;
  const to = getEnv('ADMIN_EMAIL') || getEnv('SMTP_TO') || from;

  if (!host || !user || !pass || !from || !to) {
    return { sent: false, reason: 'SMTP environment variables are not configured.' };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
  });

  return { sent: true };
}
