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
import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { usePluginState } from 'pages/agent-full-page/store';
import { ActiveScope } from 'types/active-scope';
import { useAgent } from './use-agent';

export function useActiveScope(): ActiveScope | null {
  const { agentId, buildVersion } = usePluginState();
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};
  const [data, setData] = useState<ActiveScope | null>(null);
  const isActiveBuildVersion = buildVersion === activeBuildVersion;

  useEffect(() => {
    function handleDataChange(newData: ActiveScope) {
      setData(newData);
    }

    const unsubscribe = agentId && buildVersion && isActiveBuildVersion
      ? defaultTest2CodePluginSocket.subscribe('/active-scope', handleDataChange, {
        agentId,
        buildVersion,
        type: 'AGENT',
      })
      : setData(null);

    return () => {
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line
  }, [agentId, buildVersion, isActiveBuildVersion]);

  return data;
}
