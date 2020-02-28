import { useEffect, useState } from 'react';
import { defaultAdminSocket } from 'common/connection';

import { CommonEntity } from 'types/common-entity';

export function useCommonEntity(id: string, type: string) {
  const [data, setData] = useState<CommonEntity | null>(null);

  useEffect(() => {
    function handleDataChange(newData: CommonEntity) {
      setData(newData);
    }

    const unsubscribe = defaultAdminSocket.subscribe(
      `/${type === 'service-group' ? 'service-groups' : 'agents'}/${id}`,
      handleDataChange,
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [id]);

  return data;
}
