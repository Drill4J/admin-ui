import { useEffect, useState } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';

export function usePluginData<Data>(serviceGroupId: string, pluginId: string): Data | null {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = defaultTest2CodePluginSocket.subscribe(
      '/service-group/summary', handleDataChange, { groupId: serviceGroupId, type: 'GROUP' },
    );

    return () => {
      unsubscribe();
    };
  }, [serviceGroupId, pluginId]);

  return data;
}
