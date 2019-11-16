import { IResetPassword } from '@/core/models/interfaces/user';

export interface IOwnProps {
  readonly className?: string;
}

export interface IReduxProps {
  isLoading?: boolean;
}

export interface IReduxActionProps {
  actions: {
    resetPassword: ({email}: IResetPassword) => void;
  };
}

export interface IForgetForm {
  handleChange: (values: any) => void;
}