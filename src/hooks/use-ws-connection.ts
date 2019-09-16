import { DrillSocket } from '@drill4j/socket';
import { useEffect, useState } from 'react';

export function useWsConnection<Data>(socket: DrillSocket, topic: string, message?: object) {
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
