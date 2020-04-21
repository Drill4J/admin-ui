import { useEffect, useState } from 'react';

import { defaultPluginSocket } from 'common/connection';

export function usePluginData<Data>(serviceGroupId: string, pluginId: string) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = defaultPluginSocket.subscribe(
      '/service-group/summary', handleDataChange, { groupId: serviceGroupId, type: 'GROUP' },
    );

    return () => {
      unsubscribe();
    };
  }, [serviceGroupId, pluginId]);

  return data;
}
