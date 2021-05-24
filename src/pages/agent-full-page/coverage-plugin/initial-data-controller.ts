/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ActiveSessions } from 'types/active-sessions';
import { useAgent, useBuildVersion } from 'hooks';
import { AGENT_STATUS } from 'common/constants';
import { useCoveragePluginDispatch, setActiveSessions } from './store';
import { usePluginDispatch, setLoading } from '../store';

interface Props {
  children?: ReactElement;
}

export const InitialDataController = ({ children }: Props) => {
  const activeSessions =
    useBuildVersion<ActiveSessions>('/active-scope/summary/active-sessions') || {};
  const { agentId } = useParams<{ agentId: string }>();
  const { status } = useAgent(agentId) || {};
  const dispatch = useCoveragePluginDispatch();
  const pluginDispatch = usePluginDispatch();

  useEffect(() => {
    dispatch(setActiveSessions(activeSessions));

    pluginDispatch(setLoading(Boolean(activeSessions.count) && status === AGENT_STATUS.ONLINE));

    return () => pluginDispatch(setLoading(false));
    // eslint-disable-next-line
  }, [activeSessions.count, status]);
  return children as ReactElement;
};
