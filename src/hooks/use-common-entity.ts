/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
      `/api/${type === 'service-group' ? 'groups' : 'agents'}/${id}`,
      handleDataChange,
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [id]);

  return data;
}
