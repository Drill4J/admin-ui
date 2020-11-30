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
