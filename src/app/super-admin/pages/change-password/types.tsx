import { IUpdatePassword } from '@/core/models/interfaces/user';

export interface IOwnProps {
  readonly className?: string;
}

export interface IReduxProps {
  isLoading?: boolean;
}

export interface IReduxActionProps {
  actions: {
    updatePassword: ({resetPasswordToken, password}: IUpdatePassword) => void,
  };
}