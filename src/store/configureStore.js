import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';
import createSagaMiddleware from 'redux-saga';
import reduxThunk from 'redux-thunk';

import routesMap from 'routes/routesMap';
import reducers from './reducers';
import { rootSagas } from './rootSaga';

const composeEnhancers = (...args) =>
  typeof window !== 'undefined' ? composeWithDevTools({})(...args) : compose(...args);

export const configureStore = (history, preloadedState) => {
  const { reducer, middleware, enhancer, initialDispatch } = connectRoutes(routesMap, {
    initialDispatch: false,
  });

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const saga = createSagaMiddleware();
  const middlewares = applyMiddleware(reduxThunk, saga, middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers', () => {
      const reducers2 = require('./reducers'); // eslint-disable-line global-require
      const rootReducer2 = combineReducers({ ...reducers2, location: reducer });
      store.replaceReducer(rootReducer2);
    });
  }

  saga.run(rootSagas);

  return { store, initialDispatch };
};
