import { useState, useEffect } from 'react';

import { defaultPluginSocket } from 'common/connection';
import { usePluginState } from '../store';

export function useBuildVersion<Data>(topic: string) {
  const { agentId, buildVersion } = usePluginState();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = agentId && buildVersion
      ? defaultPluginSocket.subscribe(topic, handleDataChange, {
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
