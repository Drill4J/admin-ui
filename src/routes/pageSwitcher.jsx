import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NOT_FOUND, redirect } from 'redux-first-router';
import { LOGIN_PAGE, FORGOT_PASSWORD_PAGE, PLUGIN_PAGE } from 'common/constants';
import { ModalContainer } from 'components/modal';
import { pageNames } from 'controllers/pages/constants';
import { pageSelector } from 'controllers/pages';
import { isAuthorizedSelector } from 'controllers/auth';
import { LocalizationSwitcher } from 'components/localization/localizationSwitcher';
import { ScreenLock } from 'components/screenLock';
import { Notifications } from 'components/notification';

import { EmptyLayout } from 'layouts/emptyLayout';
import { AppLayout } from 'layouts/appLayout';

import { NotFoundPage } from 'pages/outside/notFoundPage';
import { LoginPage } from 'pages/outside/loginPage';
import { ForgotPasswordPage } from 'pages/outside/forgotPasswordPage';
import { PluginPage } from 'pages/inside/pluginPage';

import styles from './pageSwitcher.scss';

const pageRendering = {
  [NOT_FOUND]: { component: NotFoundPage, layout: EmptyLayout },
  [LOGIN_PAGE]: { component: LoginPage, layout: EmptyLayout },
  [FORGOT_PASSWORD_PAGE]: { component: ForgotPasswordPage, layout: EmptyLayout },

  [PLUGIN_PAGE]: { component: PluginPage, layout: AppLayout },
};

Object.keys(pageNames).forEach((page) => {
  if (!pageRendering[page]) {
    throw new Error(`Rendering for '$page' was not defined.`);
  }
});

const PageSwitcher = ({ page }) => {
  if (!page) return null;

  const { component: PageComponent, layout: Layout } = pageRendering[page];

  if (!PageComponent) throw new Error(`Page $page does not exist`);
  if (!Layout) throw new Error(`Page $page is missing layout`);

  return (
    <div className={styles.pageSwitcher}>
      <Layout>
        <LocalizationSwitcher />
        <PageComponent />
      </Layout>
      <ModalContainer />
      <Notifications />
      <ScreenLock />
    </div>
  );
};

PageSwitcher.propTypes = {
  page: PropTypes.string,
  redirect: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool,
};

PageSwitcher.defaultProps = {
  page: undefined,
  isAuthorized: false,
};

export default connect(
  (state) => ({
    page: pageSelector(state),
    isAuthorized: isAuthorizedSelector(state),
  }),
  { redirect },
)(PageSwitcher);
