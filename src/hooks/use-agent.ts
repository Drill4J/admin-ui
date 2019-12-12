import { useEffect, useState } from 'react';

import { defaultAdminSocket } from 'common/connection';
import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';

export function useAgent(agentId: string, callback?: () => void) {
  const [data, setData] = useState<Agent | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Agent) {
      if (!newData || newData.status === AGENT_STATUS.NOT_REGISTERED) {
        callback && callback();
      }
      setData(newData);
    }

    const unsubscribe = defaultAdminSocket.subscribe(`/get-agent/${agentId}`, handleDataChange);

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [agentId]);

  return data;
}
