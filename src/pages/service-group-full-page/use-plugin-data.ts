import { useEffect, useState } from 'react';

import { defaultTest2CodePluginSocket } from 'common/connection';

export function usePluginData<Data>(topic: string, serviceGroupId: string, pluginId: string): Data | null {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = defaultTest2CodePluginSocket.subscribe(
      topic, handleDataChange, { groupId: serviceGroupId, type: 'GROUP' },
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [serviceGroupId, pluginId]);

  return data;
}
