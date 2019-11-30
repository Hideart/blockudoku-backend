import { Model, DataTypes, BuildOptions } from 'sequelize';
import uuidv4 from 'uuid/v4';

import { sha256 } from '../../core/services/hash';
import { config } from '../../../config';
import { sequelizeConnection } from '../index';
import { IUserModel, IUser } from '../../core/models/interfaces/user';
import { jwtSign } from '../../core/services/jwt.service';

type UserModelStatic = typeof Model & (new (values?: IUser, options?: BuildOptions) => IUserModel);

export const UserModel = <UserModelStatic>sequelizeConnection.define('UserModel', {
  id: {
    type: DataTypes.UUIDV4,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nickname: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
},
  {
    tableName: 'users',
    paranoid: true,
  },
);

UserModel.prototype.serialize = function(): IUser {
  const user = this.toJSON();

  delete user.id;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.deletedAt;

  return user;
};

UserModel.prototype.isCorrectPassword = function(password: string): boolean {

  const hashedPassword = sha256(password, config.get('salt4pass'));
  return this.password === hashedPassword;
};

UserModel.prototype.generateJwtToken = function(): string {
  return jwtSign({id: this.id});
};

UserModel.beforeCreate((model, options): void => {
    if (model.password) {
      const hashedPassword = sha256(model.password, config.get('salt4pass'));
      model.password = hashedPassword;
    }
    if (model.id === null) {
      model.id = uuidv4();
    }
});