import {
  Middleware,
} from 'redux';

import { IAsyncActionWorker } from '@/core/models/interfaces/custom-redux-middleware';

export const asyncWorkerMiddleware: Middleware = (state) => (next) => async (action) => {
    if (action.types && action.types.started) {
      const asyncActionWorker: IAsyncActionWorker = action;

      if (asyncActionWorker.effects && asyncActionWorker.effects.started) {
        await asyncActionWorker.effects.started({
          params: action.params,
          getState: state.getState,
          dispatch: state.dispatch,
        });
      }

      next(asyncActionWorker.types.started(action.params));

      try {
        const result = await asyncActionWorker.worker(asyncActionWorker.params);
        if (asyncActionWorker.effects && asyncActionWorker.effects.done) {
          await asyncActionWorker.effects.done({
            params: action.params,
            result,
            getState: state.getState,
            dispatch: state.dispatch,
          });
        }
        next(asyncActionWorker.types.done({ params: asyncActionWorker.params, result }));
        return result;
      } catch (error) {
        if (asyncActionWorker.effects && asyncActionWorker.effects.failed) {
          await asyncActionWorker.effects.failed({
            error,
            params: action.params,
            getState: state.getState,
            dispatch: state.dispatch,
          });
        }
        next(asyncActionWorker.types.failed({ params: asyncActionWorker.params, error }));
        throw error;
      }

    } else if (typeof action === 'function') {
      await action(next, state);
    } else {
      next(action);
    }

  };
