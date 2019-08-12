import { useState, useEffect, useContext } from 'react';

import { PluginContext } from '../store';

import { defaultAdminSocket } from '../../../../common/connection';

export function useAgentId<Data>(topic: string) {
  const {
    state: { agentId },
  } = useContext(PluginContext);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const connection = agentId
      ? defaultAdminSocket.subscribe(`/agent/${agentId}/${topic}`, handleDataChange)
      : null;

    return () => {
      connection && connection.unsubscribe(topic);
    };
  }, [agentId]);

  return data;
}
