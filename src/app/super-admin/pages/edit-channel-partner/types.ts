import { IChannelPartner, IChannelPartnerUpdate } from '../../models/interfaces/channel-partner';

export interface IOwnProps {
  readonly className?: string;
}

export interface IOwnState {
  isFormChanged: boolean;
}

export interface IReduxProps {
  isLoading?: boolean;
  user: IChannelPartnerUpdate;
  userInfo: IChannelPartner;
}

export interface IReduxActionProps {
  actions: {
    getUserInfo: (id: string) => void;
    updateUser: (data: IChannelPartnerUpdate) => void;
  };
}

export interface IEditChannelPartnerPage {
  handleChange: (avatar: File) => void;
  handleInputChange: (field: string) => void;
}
