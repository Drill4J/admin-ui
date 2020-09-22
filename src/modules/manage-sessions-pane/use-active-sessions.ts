import { useEffect, useState } from 'react';

import { ActiveSession } from 'types/active-session';
import { defaultTest2CodePluginSocket } from 'common/connection';

export function useActiveSessions(agentType: string, id: string, buildVersion?: string): ActiveSession[] | null {
  const [data, setData] = useState<ActiveSession[] | null>(null);
  const message = agentType === 'Agent' ? {
    agentId: id,
    buildVersion,
    type: 'AGENT',
  } : { groupId: id, type: 'GROUP' };
  const topic = agentType === 'Agent' ? '/active/sessions' : '/service-group/active/sessions';

  useEffect(() => {
    function handleDataChange(newData: ActiveSession[]) {
      setData(newData);
    }

    const unsubscribe = defaultTest2CodePluginSocket.subscribe(
      topic,
      handleDataChange,
      message,
    );

    return () => {
      unsubscribe();
    };
  }, [id, buildVersion, message, topic]);

  return data;
}
