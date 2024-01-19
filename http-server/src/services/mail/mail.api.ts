import dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';
import { google } from 'googleapis';

import mailTemplate from './mail.template';

import type { Transporter } from 'nodemailer';

const OAuth2 = google.auth.OAuth2;
const OAuth2Client = new OAuth2(
  process.env.SMTP_CLIENT_ID,
  process.env.SMTP_CLIENT_SECRET,
);

OAuth2Client.setCredentials({ refresh_token: process.env.SMTP_REFRESH_TOKEN });

class MailAPI {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: String(process.env.SMTP_HOST),
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        type: 'OAuth2',
        clientId: process.env.SMTP_CLIENT_ID,
        clientSecret: process.env.SMTP_CLIENT_SECRET,
        refreshToken: process.env.SMTP_REFRESH_TOKEN,
        accessToken: String(OAuth2Client.getAccessToken()),
      },
    });
  }

  async send(to: string, code: number) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Activate account on Blossom',
        text: '',
        html: mailTemplate(code),
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

const mailAPI = new MailAPI();

export default mailAPI;
