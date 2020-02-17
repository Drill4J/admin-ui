import * as React from 'react';
import { useLocation, matchPath } from 'react-router-dom';

import { useAgent } from '../../hooks';
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

  const dispatch = usePluginDispatch();
  React.useEffect(() => {
    dispatch(
      setInitialConfig({
        agentId,
        pluginId,
        buildVersion,
      }),
    );
    dispatch(setAgent(agent));
    // eslint-disable-next-line
  }, [buildVersion]);
  return children as React.ReactElement<unknown>;
};
