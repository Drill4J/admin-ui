import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { useAgent } from '../../../hooks';
import { kebabToPascalCase, camelToTitle } from '../../../utils';
import { usePluginDispatch, setInitialConfig, usePluginState } from '../store';

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
      const { buildVersion = '', buildVersions = [] } = useAgent(agentId) || {};
      const { buildVersion: selectedBuildVersion } = usePluginState();
      const dispatch = usePluginDispatch();
      const { name = '', id = '' } =
        buildVersions.find(({ id: buildVersionId }) => buildVersionId === selectedBuildVersion) ||
        {};

      const { params: { pluginId = '', page = '', scopeId = '' } = {} } =
        matchPath<{ pluginId: string; page: string; scopeId: string }>(pathname, {
          path: [
            '/full-page/:agentId/:pluginId/',
            '/full-page/:agentId/:pluginId/:page/',
            '/full-page/:agentId/:pluginId/:page/:scopeId',
          ],
          exact: true,
        }) || {};
      // TODO: should be moved from this compenent
      React.useEffect(() => {
        dispatch(setInitialConfig({ agentId, pluginId: 'test-to-code-mapping', buildVersion }));
        // eslint-disable-next-line
      }, [buildVersion]);
      return (
        <div className={className}>
          <Content>
            <Item
              onClick={() => push(`/full-page/${agentId}/build-list`)}
              active={pluginId === 'build-list'}
            >
              All builds
            </Item>
            {pluginId !== 'build-list' && (
              <>
                <Divider>/</Divider>
                <Item
                  onClick={() => push(`/full-page/${agentId}/${pluginId}/dashboard`)}
                  active={pluginId !== 'build-list' && page !== 'scopes' && !scopeId}
                >{`Build ${name || id}: ${camelToTitle(kebabToPascalCase(pluginId))}`}</Item>
              </>
            )}
            {page === 'scopes' && (
              <>
                <Divider>/</Divider>
                <Item
                  active={page === 'scopes' && !Boolean(scopeId)}
                  onClick={() => push(`/full-page/${agentId}/${pluginId}/scopes`)}
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
  div({ onClick: () => {} } as { active?: boolean; onClick?: () => void }),
);
const Divider = breadcrumbs.divider('div');
