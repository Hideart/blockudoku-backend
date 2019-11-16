import { INotification } from '@/core/models/interfaces/store';

export interface IOwnState {
}

export interface IOwnProps {
  readonly className?: string;
}

export interface IReduxProps {
  notifications: INotification[];
}
export interface IReduxActionProps {
  actions: {
    closeNotification: (id: string) => void;
  };
}