import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface IMailMenssageDto {
  to: string;
  subject: string;
}

interface ISendText extends IMailMenssageDto {
  text: string;
}

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.umbler.com',
      port: 587,
      auth: {
        user: 'suporte@empregame.online',
        pass: 'empregame@suporte',
      },
    });
  }

  async sendText({ subject, text, to }: ISendText) {
    await this.transporter.sendMail({
      from: 'EmpregaMe <suporte@empregame.online>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text,
    });

    return;
  }
}
