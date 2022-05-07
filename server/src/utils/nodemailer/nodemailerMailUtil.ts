import nodemailer from 'nodemailer';
import { MailUtil, sendMailData } from "../mailUtil";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e273dddbfa4b7c",
      pass: "9aad970c84aa51"
    }
});

export class NodemailerMailUtil implements MailUtil {
    async sendMail({subject, body}: sendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Bruno Gonçalves <brunobgm002@gmail.com>',
            subject,
            html: body,
        });
    };
}