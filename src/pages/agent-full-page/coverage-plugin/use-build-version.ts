import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { SearchStatement, SortStatement } from 'modules/table-actions/table-actions-types';
import { usePluginState } from '../store';

export function useBuildVersion<Data>(topic: string, searchStatement?: SearchStatement, sortStatement?: SortStatement): Data | null {
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
        searchStatement,
        sortStatement,
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [agentId, buildVersion, topic, searchStatement, sortStatement]);

  return data;
}
