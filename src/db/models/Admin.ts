import { Model, DataTypes, BuildOptions } from 'sequelize';
import uuidv4 from 'uuid/v4';

import { sha256 } from '../../core/services/hash';
import { config } from '../../../config';
import { sequelizeConnection } from '../index';
import { IAdminModel, IAdmin } from '../../core/models/interfaces/admin';
import { jwtSign } from '../../core/services/jwt.service';
import { TokenType } from '../../core/models/enums/jwt';

type AdminModelStatic = typeof Model & (new (values?: IAdmin, options?: BuildOptions) => IAdminModel);

export const AdminModel = <AdminModelStatic>sequelizeConnection.define('AdminModel', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    tableName: 'admins',
    paranoid: true,
  },
);

AdminModel.prototype.serialize = function(): IAdmin {
  const user = this.toJSON();

  if (user.avatar) user.avatar = config.get('currentHost') + 'storage/common/avatars/' + user.avatar;

  delete user.id;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.deletedAt;

  return user;
};

AdminModel.prototype.isCorrectPassword = function(password: string): boolean {

  const hashedPassword = sha256(password, config.get('salt4pass'));
  return this.password === hashedPassword;
};

AdminModel.prototype.generateJwtToken = function(): string {
  return jwtSign({id: this.id, type: TokenType.SUPER_ADMIN});
};

AdminModel.beforeCreate((model, options): void => {
    if (model.password) {
      const hashedPassword = sha256(model.password, config.get('salt4pass'));
      model.password = hashedPassword;
    }
    if (model.id === null) {
      model.id = uuidv4();
    }
});