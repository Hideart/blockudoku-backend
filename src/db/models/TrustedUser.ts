import { Model, DataTypes, BuildOptions } from 'sequelize';
import uuidv4 from 'uuid/v4';

import { sequelizeConnection } from '../index';
import {
  ITrustedUser,
  ITrustedUserModel,
} from '../../core/models/interfaces/trusted-user';
import { jwtSign } from '../../core/services/jwt.service';
import { TokenType } from '../../core/models/enums/jwt';

type TrustedUserModelStatic =
  typeof Model & (new (values?: ITrustedUser, options?: BuildOptions) => ITrustedUserModel);

export const TrustedUserModel =
  <TrustedUserModelStatic>sequelizeConnection.define('TrustedUserModel',
{
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
},
  {
    tableName: 'trusted_users',
    paranoid: true,
  },
);

TrustedUserModel.beforeCreate((model, options): void => {
  if (model.id === null) {
    model.id = uuidv4();
  }

  if (model.token === null) {
    model.token = jwtSign({id: model.id, type: TokenType.LANDING}, '100y');
  }
});
