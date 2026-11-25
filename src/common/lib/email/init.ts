import {env} from "../config/env";
import {MailjetProvider} from "../../pkg/email/mailjet";
import {NodeMailerProvider} from "../../pkg/email/nodemailer";

export const mailjetProvider = new MailjetProvider({
    apiKey: env.mailjet.key,
    apiSecret: env.mailjet.secret,
    fromEmail: env.mailjet.fromEmail,
    fromName: env.mailjet.fromName,
});

export const nodemailerProvider = new NodeMailerProvider({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    user: env.nodemailer.email,
    pass: env.nodemailer.password,
    fromEmail: env.nodemailer.fromName,
    fromName: env.nodemailer.fromName,
});
