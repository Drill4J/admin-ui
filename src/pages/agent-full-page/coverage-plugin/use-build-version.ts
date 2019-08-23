import { useState, useEffect, useContext } from 'react';

import { defaultPluginSocket } from '../../../common/connection';
import { usePluginState } from './store';

export function useBuildVersion<Data>(topic: string) {
  const { agentId, buildVersion } = usePluginState();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const connection = buildVersion
      ? defaultPluginSocket.subscribe(topic, handleDataChange, {
          agentId,
          buildVersion,
        })
      : null;

    return () => {
      connection && connection.unsubscribe(topic);
    };
  }, [agentId, buildVersion]);

  return data;
}
