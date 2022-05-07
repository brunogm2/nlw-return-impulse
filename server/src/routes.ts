import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackController } from './controllers/submitFeedbackController';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { NodemailerMailUtil } from './utils/nodemailer/nodeMailerMailUtil';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailUtil = new NodemailerMailUtil();
    
    const submitFeedbackController = new SubmitFeedbackController(
        prismaFeedbacksRepository,
        nodemailerMailUtil    
    );

    await submitFeedbackController.execute({
        type,
        comment,
        screenshot
    });

    return res.status(201).send();
});