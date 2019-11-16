import { Model } from 'sequelize';

export interface IAdmin {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}

export interface IAdminModel extends Model, IAdmin {
  readonly createdAt: Date;
  readonly updatedAt: Date;

  serialize(): IAdmin;
  isCorrectPassword(password: string): boolean;
  generateJwtToken(): string;
}
