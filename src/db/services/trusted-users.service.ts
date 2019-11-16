import { ITrustedUser } from 'src/core/models/interfaces/trusted-user';
import { TrustedUserModel } from '../models/TrustedUser';

export async function findTrustedUserByTokenService(token: string): Promise<ITrustedUser> {
  return await TrustedUserModel.findOne( {where: { token }});
}