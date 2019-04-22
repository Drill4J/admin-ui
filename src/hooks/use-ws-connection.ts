import { useEffect, useState } from 'react';

import { WsConnection } from '../common/connection';

export function useWsConnection<Data>(socket: WsConnection, topic: string, message?: object) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    function handleDataChange(newData: Data) {
      setData(newData);
    }

    const connection = socket.subscribe(topic, handleDataChange, message);

    return () => {
      connection.unsubscribe(topic);
    };
  }, [message]);

  return data;
}
