import { AdminModel } from '../../db/models/Admin';
import { IAdminModel } from '../../core/models/interfaces/admin';

export async function findAdminByIdService(id: string): Promise<IAdminModel | null> {
  const user = await AdminModel.findOne({where: { id }});
  return user;
}

export async function findAdminByEmailService(email: string): Promise<IAdminModel | null> {
  const user = await AdminModel.findOne({where: { email }});
  return user;
}

export async function updateAdminByIdService(id: string, payload: any): Promise<IAdminModel | null> {
  return await AdminModel.update(payload, {where: { id }})
  .then(async () => {
    return await findAdminByIdService(id);
  })
  .catch((): null => null );
}
