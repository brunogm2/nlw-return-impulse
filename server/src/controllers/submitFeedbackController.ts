import { FeedbacksRepository } from "../repositories/feedbacksRepository";
import { MailUtil } from "../utils/mailUtil";

export interface SubmitFeedbackControllerRequest {
    type: string;
    comment: string;
    screenshot?: string;   
}

export class SubmitFeedbackController {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailUtil: MailUtil
    ) {}

    async execute(request: SubmitFeedbackControllerRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailUtil.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                    `<p>Tipo do feedback: ${type} </p>`,
                    `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        });
    }
}