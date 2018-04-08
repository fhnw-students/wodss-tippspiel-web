import { createStore, applyMiddleware, Store, Middleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from '../store';

// -------------------------------------------------------------------------
// Middleware Configurations
// -------------------------------------------------------------------------

const middlewares: Middleware[] = [
  thunk,
  reduxImmutableStateInvariant()
];

// -------------------------------------------------------------------------
// Redux logging middleware
// -------------------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

/* tslint:disable */
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
/* tslint:enable */

// -------------------------------------------------------------------------
// Store Configurations
// -------------------------------------------------------------------------

export function configureStore(): Store<any> {
  return createStore<any>(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
