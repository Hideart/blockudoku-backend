import { Dispatch, Action } from 'redux';

export interface IAsyncActionWorker extends IAsyncWorkerEffects {
  types: {
    started: (data?: any) => {type: string, payload?: any};
    done: (data?: any) => {type: string, payload?: any};
    failed: (data?: any) => {type: string, payload?: any};
  };
  params?: any;
  worker: (data: any) => Promise<any> | any;
}

export interface IAsyncWorkerEffects {
    effects?: {
      started?: (data?: any) => Promise<void> | void;
      done?: (data?: any) => Promise<void> | void;
      failed?: (data?: any) => Promise<void> | void;
    };
}
export type ICustomAction = (dispatch: Dispatch, getState: () => any) => Promise<any> | any;

export interface ICustomDispatch extends Dispatch {
  (action: IAsyncActionWorker | Action<any> | ICustomAction ): any;
}
