import { IUserLogin } from '@/core/models/interfaces/user';

export interface IOwnProps {
  readonly className?: string;
}
export interface IOwnState {
  forgetPassword: boolean;
}

export interface IReduxProps {
}
export interface IReduxActionProps {
  actions: {
    adminLogin: ({email, password}: IUserLogin) => void;
  };
}