import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { usePluginState } from '../store';

export function useBuildVersion<Data>(topic: string) {
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
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [agentId, buildVersion, topic]);

  return data;
}
