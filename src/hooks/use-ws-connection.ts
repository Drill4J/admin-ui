import { WsConnection } from '../common/connection';
import { useEffect, useState } from 'react';

export function useWsConnection<Data>(socket: WsConnection, topic: string) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const connection = socket.subscribe(topic, () => {
      connection.subscribe(topic, setData);
    });

    return () => {
      connection.unsubscribe(topic);
    };
  }, []);

  return data;
}
