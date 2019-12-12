import * as React from 'react';

import { useBuildVersion } from './use-build-version';
import { useCoveragePluginDispatch, setActiveSessions } from './store';
import { usePluginDispatch, setLoading } from '../store';
import { ActiveSessions } from 'types/active-sessions';

interface Props {
  children?: React.ReactElement;
}

export const InitialDataController = ({ children }: Props) => {
  const activeSessions = useBuildVersion<ActiveSessions>('/active-sessions') || {};
  const dispatch = useCoveragePluginDispatch();
  const pluginDispatch = usePluginDispatch();

  React.useEffect(() => {
    dispatch(setActiveSessions(activeSessions));
    pluginDispatch(setLoading(Boolean(activeSessions.count)));
    // eslint-disable-next-line
  }, [activeSessions.count]);
  return children as React.ReactElement<any>;
};
