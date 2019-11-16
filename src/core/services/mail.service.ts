import nodemailer from 'nodemailer';

import { config } from '../../../config';
import { MailStatus } from '../models/enums/mail';
import { IMailOptions } from '../models/interfaces/mail';
import { UserType } from '../models/enums/user';

const mailTransporter = nodemailer.createTransport(config.get('mail.mailerTransport') as any);

export const sendResetPasswordMail =
  async (
    recipient: string,
    token: string,
    userType: UserType = UserType.SUPER_ADMIN,
    frontLink?: string,
  ): Promise<MailStatus> => {
    if (!frontLink) {
      frontLink = config.get('webClientHost');
    }
    const mailOptions = {
        to: recipient,
        subject: `[LeanLogic] ${userType === UserType.SUPER_ADMIN ? 'Super Admin' : 'Channel Partner'} reset password`,
        html: `
          To reset password, please click the link:
          <a href="${frontLink}update-password/${token}">Reset password</a>
        `,
      };

    return sendMail(mailOptions);
};

export const sendMail = async (options: IMailOptions): Promise<MailStatus> => {

    options.from = options.from || config.get('mail.mailerTransport.auth.user');

    return new Promise ((resolve) => {
        mailTransporter.sendMail(options, (error) => {
            if (error) resolve(MailStatus.ABORTED);
            resolve(MailStatus.SENT);
        });
    });
};