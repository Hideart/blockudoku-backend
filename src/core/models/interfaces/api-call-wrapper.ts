import { default as HttpStatusCode } from '@/core/models/enums/http-status-code';
import { HttpMethod } from '@/core/models/enums/http-method';
import { AxiosError } from 'axios';

export interface IWrapperOptions  {
    method: HttpMethod;
    url: string;
    data?: any;
    headers?: {[key: string]: string};
    notification?: {
        messageBeforeStart?: string;
        statusHandler?: IStatusHandler[];
        callback?: (e: AxiosError) => void;
    };
}

export interface IStatusHandler {
    statusCode: HttpStatusCode;
    message: IMessageHandler | string;
}

export type IMessageHandler = (e: any) => Promise<any>;