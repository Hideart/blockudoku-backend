import { RequestHandler } from 'fastify';

import {
  findUserByNicknameService,
  createUserService,
  updateUserService,
} from './users.service';

import { BadRequestError, NotFoundError, InternalServerError } from '../../exceptions/errors';
import { jwtVerify } from '../../core/services/jwt.service';

export const userSignInHandler: RequestHandler = async (request, reply) => {
  const { password, nickname, token } = request.body;

  const user = await findUserByNicknameService(nickname);
  if (!user) {
    throw new NotFoundError('Nickname or password is wrong');
  }

  if (password && !user.isCorrectPassword(password)) {
    throw new NotFoundError('Nickname or password is wrong');
  }

  if (token) {
    const decoded = jwtVerify(token);
    if (decoded.id !== user.id) {
      throw new NotFoundError('User not found');
    }
  }

  if (!password && !token) {
    throw new BadRequestError('Password or token is required');
  }

  const response = {
    token: user.generateJwtToken(),
    user: user.serialize(),
  };

  reply.send(response);
};

export const userSignUpHandler: RequestHandler = async (request, reply) => {
  const { nickname } = request.body;

  const existsUser = await findUserByNicknameService(nickname);
  if (existsUser) throw new BadRequestError('User already exists');

  const userInfo = {...request.body};
  const createdUser = await createUserService(userInfo);
  if (!createdUser) throw new InternalServerError('Something went wrong');

  const serializedUser = await createdUser.serialize();
  reply.send(serializedUser);
};

export const updateUserInfoHandler: RequestHandler = async (request, reply) => {
  const { nickname } = request.body;

  const user = await findUserByNicknameService(nickname);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const updatedUser = await updateUserService({id: user.id, info: {...request.body}});
  reply.send(updatedUser);
};

export const changeBalanceHandler: RequestHandler = async (request, reply) => {
  const { amount: amountString, nickname } = request.body;

  const user = await findUserByNicknameService(nickname);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const amount = Number(amountString);
  const updateBalanceInfo = {id: user.id, info: {balance: user.balance + amount}};
  const updatedUser = await updateUserService(updateBalanceInfo);
  reply.send(updatedUser);
};
