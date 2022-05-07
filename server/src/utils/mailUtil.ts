export interface sendMailData {
    subject: string;
    body: string;
}

export interface MailUtil {
    sendMail: (data: sendMailData) => Promise<void>;
}