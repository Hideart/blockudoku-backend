import { IEffect } from '@/core/models/types/effect';

import { getChannelPartnersWorker } from './channel-partner.action';

export const getChannelPartnersEffect: IEffect<{}> = async ({dispatch, params}) => {
    dispatch(getChannelPartnersWorker({searchOption: params.searchOption}));
};

export const saveReportFileEffect: IEffect<{result: any}> = async (data) => {
    const downloadLink = window.document.createElement('a');
    const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    downloadLink.href = `data:${contentType};base64,${data.result}`;
    downloadLink.download = 'test.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
};
