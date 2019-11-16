import { IChannelPartner, IChannelPartnerUpdate } from '@admin/models/interfaces/channel-partner';
import { ChannelPartnerVerifyStatus } from '@admin/models/enums/channel-partner';

export interface IOwnState {
  searchText: string;
  orderColumn: string;
  orderType: string;
  limit: number;
  offset: number;
  status: string;
  verifyStatus: ChannelPartnerVerifyStatus;
  selectedRows: string[];
  tablePaginationStep: number;
  deletePopup: boolean;
}

export interface IOwnProps {
  readonly className?: string;
}

export interface IReduxProps {
  channelPartners: IChannelPartner[];
  totalChannelPartnerCount: number;
}
export interface IReduxActionProps {
  actions: {
    getChannelPartners: (option?: any) => void;
    multipleDeleteChannelPartners: (ids: string[], searchOption: string) => void;
    verifyUsers: (ids: string[], searchOption: string) => void;
    updateStatus: (cpData: IChannelPartnerUpdate, searchOption: string) => void;
  };
}
export interface ILayout {
}