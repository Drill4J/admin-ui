import { useState, useEffect } from 'react';

import { defaultPluginSocket } from '../../../common/connection';

export function useBuildVersion<Data>(topic: string, agentId?: string, buildVersion?: string) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: any) {
      setData(newData);
    }

    const connection = defaultPluginSocket.subscribe(topic, handleDataChange, {
      agentId,
      buildVersion,
    });

    return () => {
      connection.unsubscribe(topic);
    };
  }, [agentId, buildVersion]);

  return data;
}
