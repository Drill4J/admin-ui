import { useEffect, useState } from 'react';
import { DrillSocket } from '@drill4j/socket';

export function useWsConnection<Data>(socket: DrillSocket, topic: string, message?: Record<string, unknown>) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const unsubscribe = socket.subscribe(topic, handleDataChange, message);

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return data;
}
