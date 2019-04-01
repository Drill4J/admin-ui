import { useEffect, useState } from 'react';

import { WsConnection } from '../common/connection';

export function useWsConnection<Data>(socket: WsConnection, topic: string) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const connection = socket.subscribe(topic, handleDataChange);

    return () => {
      connection.unsubscribe(topic);
    };
  }, []);

  return data;
}
