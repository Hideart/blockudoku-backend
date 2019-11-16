import { applyMiddleware, compose, createStore } from 'redux';
import { asyncWorkerMiddleware } from '@/core/store/custom-middleware';

import { default as reducers } from './reducers';

const composeMiddlewares = applyMiddleware(
  asyncWorkerMiddleware,
);

// Use Redux DevTools Extension if available and not in production.
const composeEnhancers = (process.env.NODE_ENV !== 'production'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

export const store = createStore(reducers, composeEnhancers(composeMiddlewares));
