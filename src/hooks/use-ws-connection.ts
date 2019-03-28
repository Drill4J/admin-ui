import { useEffect, useState } from 'react';

import { WsConnection } from '../common/connection';

export function useWsConnection<T>(topic: string, socket?: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const connection = new WsConnection(socket).onOpen(() => {
      connection.subscribe(topic, setData);
    });

    return () => {
      connection.unsubscribe(topic);
    };
  }, []);

  return data;
}
