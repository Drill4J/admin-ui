import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { Search } from 'types/search';
import { Sort } from 'types/sort';
import { OutputType } from 'types/output-type';
import { usePluginState } from 'pages/agent-full-page/store';

export function useBuildVersion<Data>(
  topic: string,
  filters?: Search[],
  orderBy?: Sort[],
  output?: OutputType,
  activeBuildVersion?: string,
): Data | null {
  const { agentId, buildVersion } = usePluginState();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = agentId && buildVersion
      ? defaultTest2CodePluginSocket.subscribe(topic, handleDataChange, {
        agentId,
        buildVersion: activeBuildVersion || buildVersion,
        type: 'AGENT',
        filters,
        orderBy,
        output,
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line
  }, [agentId, buildVersion, activeBuildVersion, topic, orderBy, filters]);

  return data;
}
