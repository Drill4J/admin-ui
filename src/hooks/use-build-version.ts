import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { Search } from 'types/search';
import { Sort } from 'types/sort';
import { usePluginState } from 'pages/agent-full-page/store';

export function useBuildVersion<Data>(topic: string, filters?: Search[], orderBy?: Sort[]): Data | null {
  const { agentId, buildVersion } = usePluginState();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = agentId && buildVersion
      ? defaultTest2CodePluginSocket.subscribe(topic, handleDataChange, {
        agentId,
        buildVersion,
        type: 'AGENT',
        filters,
        orderBy,
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line
  }, [agentId, buildVersion, topic, orderBy, filters]);

  return data;
}
