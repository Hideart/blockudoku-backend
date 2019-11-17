import { UserModel } from '../../db/models/User';
import { IUser, IUserModel, IUserUpdate } from '../../core/models/interfaces/user';

export function findUserByIdService(id: string): Promise<IUserModel | null> {
  return UserModel.findByPk(id);
}

export function findUserByEmailService(email: string): Promise<IUserModel | null> {
  return UserModel.findOne({where: { email }});
}

export function findUserByNicknameService(nickname: string): Promise<IUserModel | null> {
  return UserModel.findOne({where: { nickname }});
}

export function createUserService(userInfo: IUser): Promise<IUserModel | null> {
  return UserModel.create(userInfo);
}

export async function updateUserService(userData: IUserUpdate): Promise<IUserModel | null> {
  const updateResult = await UserModel.update(userData.info, {where: {id: userData.id}});
  if (updateResult) {
    return UserModel.findByPk(userData.id);
  }
  return null;
}
