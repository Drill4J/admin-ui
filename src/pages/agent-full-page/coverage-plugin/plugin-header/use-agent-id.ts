import { useState, useEffect, useContext } from 'react';

import { usePluginState } from '../store';

import { defaultAdminSocket } from '../../../../common/connection';

export function useAgentId<Data>(topic: string) {
  const { agentId } = usePluginState();
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
