import * as React from 'react';

import { ActiveSessions } from 'types/active-sessions';
import { useBuildVersion } from 'hooks';
import { useCoveragePluginDispatch, setActiveSessions } from './store';
import { usePluginDispatch, setLoading } from '../store';

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

    return () => pluginDispatch(setLoading(false));
    // eslint-disable-next-line
  }, [activeSessions.count]);
  return children as React.ReactElement<any>;
};
