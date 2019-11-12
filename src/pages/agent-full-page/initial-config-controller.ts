import * as React from 'react';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';

import { useAgent, useWsConnection } from '../../hooks';
import { defaultAdminSocket } from '../../common/connection';
import { usePluginDispatch, setInitialConfig, setAgent } from './store';

interface Props extends RouteComponentProps {
  children?: React.ReactElement;
}

export const InitialConfigController = withRouter(({ children, location: { pathname } }: Props) => {
  const { params: { agentId = '', buildVersion = '' } = {} } =
    matchPath<{
      agentId: string;
      pluginId: string;
      buildVersion: string;
    }>(pathname, {
      path: '/full-page/:agentId/:buildVersion/:pluginId',
    }) || {};
  const agent = useAgent(agentId) || {};
  const buildVersions =
    useWsConnection<Array<{ buildVersion: string; alias: string }>>(
      defaultAdminSocket,
      `/${agentId}/builds`,
    ) || [];
  const { alias = '' } = buildVersions.find(({ buildVersion: id }) => id === buildVersion) || {};

  const dispatch = usePluginDispatch();
  React.useEffect(() => {
    dispatch(
      setInitialConfig({
        agentId,
        pluginId: 'test-to-code-mapping',
        buildVersion: { id: buildVersion, name: alias },
      }),
    );
    dispatch(setAgent(agent));
    // eslint-disable-next-line
  }, [buildVersion, alias]);
  return children as React.ReactElement<any>;
});
