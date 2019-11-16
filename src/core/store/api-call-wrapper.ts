import Axios, { AxiosError } from 'axios';
import { NotificationService } from '@/core/services/notification.service';
import { default as HttpStatusCode } from '@/core/models/enums/http-status-code';
import { IClientConfig } from '@/core/models/interfaces/client-config';
import { History } from 'history';

import {
    IStatusHandler,
    IMessageHandler,
    IWrapperOptions,
} from '@/core/models/interfaces/api-call-wrapper';

import { NodeEnv } from '../models/enums/node-env';

export interface IApiCallWrapperOption  {
    notification: NotificationService;
    clientGlobalConfig: IClientConfig;
    redirectUrl: string;
    router: History<any>;
}

export class ApiCallWrapper {
    notificationService: NotificationService;
    globalConfig: IClientConfig;
    redirectLink: string;
    appRouter: History;

  constructor({notification, clientGlobalConfig, redirectUrl, router }: IApiCallWrapperOption ) {
    this.notificationService = notification;
    this.globalConfig = clientGlobalConfig;
    this.redirectLink = redirectUrl;
    this.appRouter = router;
  }

  async wrap<T> (opt: IWrapperOptions): Promise<T | void> {
      const isNotificationOptionsExists = opt && opt.notification;

      const urlRequest = `${opt.method.toUpperCase()}:${opt.url}`.split('?')[0];

      if (isNotificationOptionsExists && opt.notification!.messageBeforeStart) {
          this.notificationService.loadingMessage(opt.notification!.messageBeforeStart, urlRequest);
      }
      try {
          const result = await Axios({
              url: opt.url,
              headers: opt.headers,
              method: opt.method,
              data: opt.data,
          });
          const handler = this._findStatusHandler(opt, result.status);
          if (handler) {
              this.notificationService.successMessage(handler.message as string, urlRequest);
          }
          return result.data;
      } catch (e) {
          const error: AxiosError = e ;
          if (isNotificationOptionsExists && opt.notification!.callback) {
              opt.notification!.callback(error);
          } else if (
              isNotificationOptionsExists &&
              opt.notification!.statusHandler &&
              opt.notification!.statusHandler.length
          ) {
              if (!error.response) {
                  console.log(e);
                  this.notificationService.errorMessage(`Fatal error, see console. Message: ${e.message}`, urlRequest);
                  throw(e);
              }
              const isHandlerExists = isNotificationOptionsExists && opt.notification!.statusHandler.find(handler =>
                      handler.statusCode === error.response!.status);
              if (isHandlerExists) {
                  await this._handleStatusMessage(isHandlerExists, e, urlRequest);
              }
              if (error.response.status === HttpStatusCode.UNAUTHORIZED) {
                this.appRouter.push(this.redirectLink);
              }
          } else {
              this.notificationService.errorMessage(`Url: ${e.response.config.url};
                  Error status: ${e.response.status}; Message: ${e.message}`,
                  urlRequest,
              );
          }

          throw(e);

      }
  }
  private async _handleStatusMessage(handler: IStatusHandler, e: AxiosError, urlRequest: string) {
    try {
        const isMessageFunction = typeof handler.message === 'function';
        if (isMessageFunction) {
            const message = await (handler.message as IMessageHandler)(e);

            this.notificationService.errorMessage(message as string, urlRequest);
        } else {
            this.notificationService.errorMessage(handler.message as string, urlRequest);
        }
    } catch (e) {
        console.log(e);
        if (this.globalConfig.nodeEnv === NodeEnv.PRODUCTION) {
            console.log('Fatal error, see console');
        } else {
            alert('Fatal error, see console');
        }

    }
  }

  private _findStatusHandler(opt: IWrapperOptions, statusCode: HttpStatusCode): IStatusHandler | null  {
    if (!opt.notification ||
        !opt.notification.statusHandler ||
        !opt.notification.statusHandler
    ) {
        return null;
    }
    const isHandlerExists = opt.notification.statusHandler.find(handler =>
        handler.statusCode === statusCode);
    return isHandlerExists ? isHandlerExists : null;
  }
}
