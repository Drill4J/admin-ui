import { useEffect, useState } from 'react';

import { defaultAdminSocket } from '../common/connection';
import { Agent } from '../types/agent';

export function useAgent(agentId: string, callback?: () => void) {
  const [data, setData] = useState<Agent | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Agent) {
      if (!newData) {
        callback && callback();
      }
      setData(newData);
    }

    const unsubscribe = defaultAdminSocket.subscribe(`/get-agent/${agentId}`, handleDataChange);

    return () => {
      unsubscribe();
    };
  }, [agentId, callback]);

  return data;
}
