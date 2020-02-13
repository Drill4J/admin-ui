import * as React from 'react';
import { useLocation, matchPath } from 'react-router-dom';

import { defaultAdminSocket } from 'common/connection';
import { useAgent, useWsConnection } from '../../hooks';
import { usePluginDispatch, setInitialConfig, setAgent } from './store';

interface Props {
  children?: React.ReactElement;
}

export const InitialConfigController = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { params: { agentId = '', buildVersion = '', pluginId = '' } = {} } = matchPath<{
    agentId: string;
    pluginId: string;
    buildVersion: string;
  }>(pathname, {
    path: '/full-page/:agentId/:buildVersion/:pluginId',
  }) || {};
  const agent = useAgent(agentId) || {};
  const buildVersions = useWsConnection<Array<{ buildVersion: string; alias: string }>>(
    defaultAdminSocket,
    `/${agentId}/builds`,
  ) || [];
  const { alias = '' } = buildVersions.find(({ buildVersion: id }) => id === buildVersion) || {};

  const dispatch = usePluginDispatch();
  React.useEffect(() => {
    dispatch(
      setInitialConfig({
        agentId,
        pluginId,
        buildVersion: { id: buildVersion, name: alias },
      }),
    );
    dispatch(setAgent(agent));
    // eslint-disable-next-line
  }, [buildVersion, alias]);
  return children as React.ReactElement<unknown>;
};
