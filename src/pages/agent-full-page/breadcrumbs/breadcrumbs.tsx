import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { kebabToPascalCase, camelToTitle } from 'utils';
import { usePluginState } from '../store';

import styles from './breadcrumbs.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const breadcrumbs = BEM(styles);

export const Breadcrumbs = withRouter(
  breadcrumbs(
    ({
      className,
      history: { push },
      match: {
        params: { agentId },
      },
      location: { pathname },
    }: Props) => {
      const {
        buildVersion: { id, name },
      } = usePluginState();

      const {
        params: {
          pluginId = '', page = '', scopeId = '', urlBuildVersion = '',
        } = {},
      } = matchPath<{ pluginId: string; page: string; scopeId: string; urlBuildVersion: string }>(
        pathname,
        {
          path: [
            '/full-page/:agentId/:urlBuildVersion/:pluginId/',
            '/full-page/:agentId/:urlBuildVersion/:pluginId/:page/',
            '/full-page/:agentId/:urlBuildVersion/:pluginId/:page/:scopeId',
          ],
          exact: true,
        },
      ) || {};

      return (
        <div className={className}>
          <Content>
            <Item
              onClick={() => push(`/full-page/${agentId}/build-list`)}
              active={pluginId === 'build-list'}
              data-test="breadcrumbs:all-builds"
            >
              All builds
            </Item>
            {urlBuildVersion && (
              <>
                <Divider>/</Divider>
                <Item
                  onClick={() => push(`/full-page/${agentId}/${id}/${pluginId}/dashboard`)}
                  active={pluginId !== 'build-list' && page !== 'scopes' && !scopeId}
                  data-test="breadcrumbs:build"
                >
                  {`Build ${name || id}: ${camelToTitle(kebabToPascalCase(pluginId))}`}
                </Item>
              </>
            )}
            {page === 'scopes' && (
              <>
                <Divider>/</Divider>
                <Item
                  active={page === 'scopes' && !scopeId}
                  onClick={() => push(`/full-page/${agentId}/${id}/${pluginId}/scopes`)}
                  data-test="breadcrumbs:scopes-list"
                >
                  Scopes List
                </Item>
              </>
            )}
            {scopeId && (
              <>
                <Divider>/</Divider>
                <Item active={Boolean(scopeId)}>{scopeId}</Item>
              </>
            )}
          </Content>
        </div>
      );
    },
  ),
);

const Content = breadcrumbs.content('div');
const Item = breadcrumbs.item(
  div({ onClick: () => {}, 'data-test': '' } as {
    active?: boolean;
    onClick?: () => void;
    'data-test'?: string;
  }),
);
const Divider = breadcrumbs.divider('div');
