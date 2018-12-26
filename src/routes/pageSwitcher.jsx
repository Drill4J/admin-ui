import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NOT_FOUND, redirect } from 'redux-first-router';
import { LOGIN_PAGE, PLUGIN_PAGE } from 'common/constants';
import { ScreenLock } from 'components/screenLock';

import { EmptyLayout } from 'layouts/emptyLayout';
import { PluginsLayout } from 'layouts/pluginsLayout';

import { NotFoundPage } from 'pages/outside/notFoundPage';
import { LoginPage } from 'pages/outside/loginPage';
import { PluginPage } from 'pages/inside/pluginPage';

import styles from './pageSwitcher.css';

const pageRendering = {
  [NOT_FOUND]: { component: NotFoundPage, layout: EmptyLayout },
  [LOGIN_PAGE]: { component: LoginPage, layout: EmptyLayout },

  [PLUGIN_PAGE]: { component: PluginPage, layout: PluginsLayout },
};

const PageSwitcher = ({ page }) => {
  if (!pageRendering[page]) throw new Error(`Page "${page}" does not exist`);

  const { component: PageComponent, layout: Layout } = pageRendering[page];

  if (!PageComponent) throw new Error(`Page "${page}" is missing component`);
  if (!Layout) throw new Error(`Page "${page}" is missing layout`);

  return (
    <div className={styles.pageSwitcher}>
      <Layout>
        <PageComponent />
      </Layout>
      <ScreenLock />
    </div>
  );
};

PageSwitcher.propTypes = {
  page: PropTypes.string,
  redirect: PropTypes.func.isRequired,
};

PageSwitcher.defaultProps = {
  page: undefined,
};

export default connect(
  (state) => ({
    page: state.location.type,
  }),
  { redirect },
)(PageSwitcher);
