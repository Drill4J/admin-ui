import { useEffect, useState } from 'react';

import { defaultAdminSocket } from 'common/connection';

export function usePluginData<Data>(serviceGroupId: string, pluginId: string) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = defaultAdminSocket.subscribe(`/service-groups/${serviceGroupId}/plugins/${pluginId}`, handleDataChange);

    return () => {
      unsubscribe();
    };
  }, [serviceGroupId, pluginId]);

  return data;
}
