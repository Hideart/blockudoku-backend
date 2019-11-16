import { AsyncActionCreators } from 'typescript-fsa';
import { Dispatch } from 'redux';

interface IEffects {
  started?: (data?: any) => Promise<void> | void;
  done?: (data?: any) => Promise<void> | void;
  failed?: (data?: any) => Promise<void> | void;
}
// https://github.com/aikoven/typescript-fsa/issues/5#issuecomment-255347353
function wrapAsyncWorker<TParameters, TSuccess, TError>(
  asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
  worker: (params: TParameters) => Promise<TSuccess>,
  effects?: IEffects,
) {
  return async function wrappedWorker(dispatch: Dispatch, params: TParameters): Promise<TSuccess> {
    if (effects && effects.started) {
      await effects.started(params);
    }
    dispatch(asyncAction.started(params));
    try {
      const result = await worker(params);
      if (effects && effects.done) {
        await effects.done({ params, result, dispatch });
      }
      dispatch(asyncAction.done({ params, result }));
      return result;
    } catch (error) {
      if (effects && effects.failed) {
        await effects.failed({ params, error });
      }
      dispatch(asyncAction.failed({ params, error }));
      throw error;
    }
  };
}

export default wrapAsyncWorker;