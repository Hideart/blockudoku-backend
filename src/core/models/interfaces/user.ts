import { Model } from 'sequelize';

export interface IUser {
  id?: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  email?: string;
  balance?: number;
  rating?: number;
  password?: string;
}

export interface IUserModel extends Model, IUser {
  readonly createdAt: Date;
  readonly updatedAt: Date;

  serialize(): IUser;
  isCorrectPassword(password: string): boolean;
  generateJwtToken(): string;
}

export interface IUserUpdate {
  id: string;
  info: IUser;
}
