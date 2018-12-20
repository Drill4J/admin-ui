import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'common/polyfills';
import 'common/css/fonts/fonts.scss';
import 'common/css/variables/colors.scss';
import 'common/css/variables/fonts.scss';
import 'common/css/common.scss';
import App from './app';
import { configureStore } from './store';

export const { store } = configureStore(window.REDUX_STATE);

const renderApp = (App) => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app'),
  );
};

// eslint-disable-next-line global-require
module.hot && module.hot.accept('./app', () => renderApp(require('./app').default));

renderApp(App);
