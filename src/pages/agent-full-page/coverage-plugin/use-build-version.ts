import { useState, useEffect } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';
import { Search, Sort } from 'modules/table-actions/table-actions-types';
import { usePluginState } from '../store';

export function useBuildVersion<Data>(topic: string, search?: Search, sort?: Sort): Data | null {
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
        searchStatement: search,
        sortStatement: sort,
      })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [agentId, buildVersion, topic, search, sort]);

  return data;
}
