import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendActivationMail(email, link) {
    this.mailerService
      .sendMail({
        to: email,
        from: 'nurbekovemil@mail.ru',
        subject: 'Account activation in Music platform',
        html: `
          <div>
            <h1>To activate your account follow the link</h1>
            <a href="${process.env.SERVER_HOST}/auth/activate/${link}" target="_blank">${process.env.SERVER_HOST}/auth/activate/${link}</a>
          </div>
        `,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
