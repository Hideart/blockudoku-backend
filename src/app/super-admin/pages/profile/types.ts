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
  actions: {
    updateUser: (data: FormData) => void;
  };
}

export interface IChangeInfoPage {
  handleChange: (avatar: File) => void;
}
