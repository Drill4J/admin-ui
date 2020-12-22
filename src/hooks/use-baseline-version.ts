import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { usePluginState } from 'pages/agent-full-page/store';
import { Baseline } from 'types/baseline';

export function useBaselineVersion(activeAgentId?: string, activeBuildVersion?: string): Baseline | null {
  const { agentId, buildVersion } = usePluginState();
  const [data, setData] = useState<Baseline | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Baseline) {
      setData(newData);
    }

    const unsubscribe = (agentId && buildVersion) || (activeAgentId && activeBuildVersion)
      ? defaultTest2CodePluginSocket.subscribe('/data/baseline', handleDataChange, {
        agentId: activeAgentId || agentId,
        buildVersion: activeBuildVersion || buildVersion,
        type: 'AGENT',
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [agentId, buildVersion, activeBuildVersion, activeAgentId]);

  return data;
}
