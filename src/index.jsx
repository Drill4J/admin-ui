import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createHashHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs';
import 'common/polyfills';

import 'reset-css/reset.css';
import 'common/css/fonts/fonts.scss';
import 'common/css/common.scss';

import App from './app';
import { configureStore } from './store';

const queryParseHistory = qhistory(createHashHistory({ hashType: 'noslash' }), stringify, parse);

export const { store, initialDispatch } = configureStore(queryParseHistory, window.REDUX_STATE);

const rerenderApp = (TheApp) => {
  render(
    <Provider store={store}>
      <TheApp initialDispatch={initialDispatch} />
    </Provider>,
    document.querySelector('#app'),
  );
};

if (module.hot) {
  module.hot.accept('./app', () => {
    const app = require('./app').default; // eslint-disable-line global-require
    rerenderApp(app);
  });
}
rerenderApp(App);
