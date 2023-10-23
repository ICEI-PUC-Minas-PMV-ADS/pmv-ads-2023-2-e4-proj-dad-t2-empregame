import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';

interface IMailMenssageDto {
  to: string;
  subject: string;
}

interface ISendText extends IMailMenssageDto {
  text: string;
}

@Injectable()
export class AwsSesService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const ses = new aws.SES({
      region: process.env.AWS_REGION,
      credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      },
    });

    this.transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });
  }

  async sendText({ subject, text, to }: ISendText) {
    await this.transporter.sendMail({
      from: 'EmpregaMe <noreply@empregame.com.br>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text,
    });

    return;
  }
}
