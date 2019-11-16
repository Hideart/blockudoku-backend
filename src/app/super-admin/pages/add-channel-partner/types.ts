import { IChannelPartnerInvite } from '@admin/models/interfaces/channel-partner';

export interface IOwnProps {
  readonly className?: string;
}

export interface IReduxProps {
  isLoading?: boolean;
}

export interface IReduxActionProps {
  actions: {
    sendInvite: ({ email }: IChannelPartnerInvite) => void;
  };
}
