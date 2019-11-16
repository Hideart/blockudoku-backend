import { IResolver } from '@/core/models/interfaces/custom-route';
import { store } from '@admin/store';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import {
    getChannelPartnersWorker,
    getChannelPartnerByIdWorker,
} from '@admin/store/channel-partner/channel-partner.action';
import { history } from '@admin/router/history';
import { SAPage } from '@admin/router/routes-path';

export class ChannelPartnersResolver implements IResolver {
    async Resolve(): Promise<void> {
        const dispatch: ICustomDispatch = store.dispatch;
        const sortString = `orderType=ASC&orderColumn=name&limit=20&offset=0&filter={"verified": true }`;

        await dispatch(getChannelPartnersWorker({searchOption: sortString }));

    }
}

export class ChannelPartnerResolver implements IResolver {
    Resolve = async (): Promise<void> => {
        const dispatch: ICustomDispatch = store.dispatch;
        const id = history.location.pathname.replace(`${SAPage.EDIT_CH_PART_PAGE}/`, '');

        await dispatch(getChannelPartnerByIdWorker({id}));
    }
}
export class ChannelPartnerReportsResolver implements IResolver {
    Resolve = async (): Promise<void> => {
        const dispatch: ICustomDispatch = store.dispatch;
        const sortString = `orderType=ASC&orderColumn=name&limit=20&offset=0&filter={"verified": true }`;

        await dispatch(getChannelPartnersWorker({searchOption: sortString }));
    }
}
