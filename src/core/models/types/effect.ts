import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

interface IMainEffect <S> {
  dispatch: ICustomDispatch;
  getState: () => S;
  params: any;
}
export type IEffect<T, S = {}> = (actionData: T & IMainEffect<S>) => Promise<void> | void;
