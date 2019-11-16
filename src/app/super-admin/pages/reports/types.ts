import { IChannelPartner } from '@admin/models/interfaces/channel-partner';

export interface IOwnState {
    selectedRows: string[];
}
export interface IReduxProps {
    channelPartners: IChannelPartner[];
    totalChannelPartnerCount: number;
}
export interface IReduxActionProps {
    actions: {
        generateReport: (ids: string[]) => void;
      };
}