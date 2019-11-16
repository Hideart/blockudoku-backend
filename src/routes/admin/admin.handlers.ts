import { RequestHandler } from 'fastify';

import { sha256 } from '../../core/services/hash';
import { config } from '../../../config';
import { saveToStorage } from '../../core/services/storage.service';

import {
  findAdminByIdService,
  findAdminByEmailService,
  updateAdminByIdService,
} from './admin.service';

import {
  addUserResetPasswordTokenService,
  findUserResetPasswordTokenService,
  dropUserResetPasswordTokenService,
} from '../../db/services/reset-password-token.service';

import { BadRequestError, NotFoundError, InternalServerError } from '../../exceptions/errors';
import { sendResetPasswordMail } from '../../core/services/mail.service';

export const adminSignInHandler: RequestHandler = async (request, reply) => {
  const { password, email } = request.body;

  const user = await findAdminByEmailService(email);
  if (!user) {
    throw new BadRequestError('Email or password is wrong');
  }

  if (!user.isCorrectPassword(password)) {
    throw new BadRequestError('Email or password is wrong');
  }
  const response = {
    token: user.generateJwtToken(),
    user: user.serialize(),
  };

  reply.send(response);
};

export const updateAdminInfoHandler: RequestHandler = async (request, reply) => {
  const { id } = request.user;
  const { password, newPassword } = request.body;
  const newValues = request.body;

  if (newPassword && newPassword.length) {
    if (password && password.length) {
      const user = await findAdminByIdService(id);
      if (!user) throw new BadRequestError('Authorization token is wrong');
      if (!user.isCorrectPassword(password)) throw new BadRequestError('Old password is wrong');
      newValues.password = sha256(newPassword, config.get('salt4pass'));
    } else {
      throw new BadRequestError('Old password is wrong');
    }
  } else {
    delete newValues.password;
  }

  const oldUserData = await findAdminByIdService(id);
  if (!oldUserData) throw new BadRequestError('Incorrect user ID');

  if (newValues.avatar) {
    const avatarLink =
      await saveToStorage({data: newValues.avatar[0].data, filename: newValues.avatar[0].filename}, 'common/avatars');
    newValues.avatar = avatarLink;
  }

  const updatedUser = await updateAdminByIdService(id, newValues);
  if (!updatedUser) throw new BadRequestError('Incorrect user or payload');

  reply.send(updatedUser.serialize());
};

export const resetAdminPasswordHandler: RequestHandler = async (request, reply) => {
  const { email } = request.body;

  const user = await findAdminByEmailService(email);
  if (!user) throw new NotFoundError('User not found');

  const tokenRec = await addUserResetPasswordTokenService(email);
  if (!tokenRec) throw new InternalServerError('Something went wrong');

  sendResetPasswordMail(email, tokenRec.token);

  reply.status(204).send();
};

export const updateAdminPasswordHandler: RequestHandler = async (request, reply) => {
  const { resetPasswordToken, password } = request.body;

  const tokenData = await findUserResetPasswordTokenService(resetPasswordToken);
  if (!tokenData) throw new BadRequestError('Reset password token is invalid');

  const updatedUser = await findAdminByIdService(tokenData.admin_id);
  if (!updatedUser) throw new NotFoundError('User not found');

  const hashedPass = sha256(password, config.get('salt4pass'));
  const updatePasswordResult = await updateAdminByIdService(updatedUser.id, {password: hashedPass});
  if (!updatePasswordResult) throw new InternalServerError('Something went wrong');

  const isRecordRemoved = await dropUserResetPasswordTokenService(resetPasswordToken);
  if (!isRecordRemoved) throw new BadRequestError('Reset password token is invalid');

  reply.status(204).send();
};
