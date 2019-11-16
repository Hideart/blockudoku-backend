import { IUserInfoUpdate } from '@/core/models/interfaces/user';
import { IAdmin } from '../../models/interfaces/admin';

export interface IOwnProps {
  readonly className?: string;
}

export interface IReduxProps {
  isLoading?: boolean;
  user: IUserInfoUpdate;
  userInfo: IAdmin;
}

export interface IReduxActionProps {
  actions?: {
    updateChannelPartner: (data: any) => void;
  };
}

export interface IChangeInfoPage {
  // handleChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  // handleChangeEMail: (event: ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
