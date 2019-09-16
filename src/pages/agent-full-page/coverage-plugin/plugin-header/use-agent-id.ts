import { useState, useEffect } from 'react';

import { usePluginState } from '../store';

import { defaultAdminSocket } from '../../../../common/connection';

export function useAgentId<Data>(topic: string) {
  const { agentId } = usePluginState();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = agentId
      ? defaultAdminSocket.subscribe(`/agent/${agentId}/${topic}`, handleDataChange)
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [agentId, topic]);

  return data;
}
