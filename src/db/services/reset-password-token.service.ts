import { UserType } from '../../core/models/enums/user';
import { findAdminByEmailService } from '../../routes/admin/admin.service';
import { findChannelPartnerByEmailService } from '../../routes/channel-partner/channel.service';
import { UserPasswordResetTokenModel } from '../models/UserResetPasswordToken';
import { sha256 } from '../../core/services/hash';
import config from '../../../config/config';
import { IUserPasswordResetTokenModel } from '../../core/models/interfaces/user-reset-password-token';

// tslint:disable-next-line: max-line-length
export async function addUserResetPasswordTokenService(userEmail: string, userType: UserType = UserType.SUPER_ADMIN): Promise<{id: string, [key: string]: any} | null> {
  let user: {id: string, [key: string]: any} = {
    id: '',
  };
  let colName = '';
  let resetPasswordToken = '';

  switch (userType) {
    case UserType.SUPER_ADMIN:
      user = await findAdminByEmailService(userEmail) as {id: string, [key: string]: any};
      colName = 'admin_id';
      resetPasswordToken = user.id.length && sha256(user.id, config.get('salt4adminResetPassToken'));
      break;
    case UserType.CHANNEL_PARTNER:
      user = await findChannelPartnerByEmailService(userEmail);
      colName = 'channel_partner_id';
      resetPasswordToken = user.id.length && sha256(user.id, config.get('salt4channelResetPassToken'));
      break;
  }

  if (user.id.length) {
    const currentDate = new Date();
    const record = await UserPasswordResetTokenModel.findOrCreate({
      where: {[colName]: user.id},
      defaults: {
        [colName]: user.id,
        token: resetPasswordToken,
        valid_until: currentDate.setDate(currentDate.getDate() + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // @ts-ignore
    return record[0].dataValues;
  }

  return null;
}

export async function findUserResetPasswordTokenService(token: string): Promise<IUserPasswordResetTokenModel | null> {
    const tokenData = await UserPasswordResetTokenModel.findOne({where: { token }});
    return tokenData;
  }

export async function dropUserResetPasswordTokenService(token: string): Promise<boolean> {
    return await UserPasswordResetTokenModel.destroy( {where: { token }})
    .then(() => true)
    .catch(() => false);
  }